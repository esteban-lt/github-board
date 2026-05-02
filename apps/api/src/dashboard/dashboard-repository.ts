import type { EventRepository } from '@events/event-repository';
import { prisma } from '@lib/prisma';
import octokitClient from '@plugins/octokit-client';
import { UserRepository } from '@users/user-repository';

export class DashboardRepository {

  constructor(
    private readonly eventRepository: EventRepository,
  ) {}

  public async getStats(workspaceId: string) {
    const now = new Date();
  
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
  
    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(now.getDate() - 14);
  
    const [stars, forks, issues, pullRequests, activeRepos, totalRepos, commits7d, commitsPrev7d, sparklineEvents] = await Promise.all([
      prisma.repository.aggregate({ _sum: { stars: true },            where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { forks: true },            where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { openIssues: true },       where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { openPullRequests: true }, where: { workspaceId, isActive: true } }),
      prisma.repository.count({ where: { workspaceId, isActive: true } }),
      prisma.repository.count({ where: { workspaceId, isConnected: true } }),
      prisma.event.count({ where: { workspaceId, type: 'push', occurredAt: { gte: sevenDaysAgo } } }),
      prisma.event.count({ where: { workspaceId, type: 'push', occurredAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),
      prisma.event.findMany({
        where: {
          workspaceId,
          occurredAt: { gte: fourteenDaysAgo },
          type: { in: ['push', 'pull_request', 'issues', 'star', 'fork'] },
        },
        select: {
          type: true,
          occurredAt: true,
        },
      }),
    ]);
  
    // Agrupar eventos por tipo y día
    const sparklineMap = new Map<string, Map<string, number>>();
    for (const event of sparklineEvents) {
      const dayKey = event.occurredAt.toISOString().slice(0, 10);
      const type = event.type;
      if (!sparklineMap.has(type)) sparklineMap.set(type, new Map());
      const typeMap = sparklineMap.get(type)!;
      typeMap.set(dayKey, (typeMap.get(dayKey) ?? 0) + 1);
    }
  
    // Construir array de N días a partir de una fecha base
    const buildSparkline = (type: string, from: Date, days: number): number[] => {
      const typeMap = sparklineMap.get(type);
      return Array.from({ length: days }, (_, i) => {
        const d = new Date(from);
        d.setDate(from.getDate() + i);
        return typeMap?.get(d.toISOString().slice(0, 10)) ?? 0;
      });
    };
  
    const calcTrend = (curr: number, prev: number): number | null => {
      if (prev === 0) return null;
      return Math.round(((curr - prev) / prev) * 100);
    };
  
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
  
    return {
      totalStars:         stars._sum.stars                   ?? 0,
      totalForks:         forks._sum.forks                   ?? 0,
      openIssues:         issues._sum.openIssues             ?? 0,
      openPullRequests:   pullRequests._sum.openPullRequests ?? 0,
      activeRepositories: activeRepos,
      totalRepositories:  totalRepos,
      commits7d,
      sparklines: {
        commits:    buildSparkline('push',         sevenDaysAgo, 7),
        openIssues: buildSparkline('issues',       sevenDaysAgo, 7),
        openPRs:    buildSparkline('pull_request', sevenDaysAgo, 7),
        totalStars: buildSparkline('star',         sevenDaysAgo, 7),
        totalForks: buildSparkline('fork',         sevenDaysAgo, 7),
      },
      trends: {
        commits:    calcTrend(commits7d, commitsPrev7d),
        openIssues: calcTrend(
          sum(buildSparkline('issues',       sevenDaysAgo,    7)),
          sum(buildSparkline('issues',       fourteenDaysAgo, 7)),
        ),
        openPRs: calcTrend(
          sum(buildSparkline('pull_request', sevenDaysAgo,    7)),
          sum(buildSparkline('pull_request', fourteenDaysAgo, 7)),
        ),
        totalStars: calcTrend(
          sum(buildSparkline('star',         sevenDaysAgo,    7)),
          sum(buildSparkline('star',         fourteenDaysAgo, 7)),
        ),
        totalForks: calcTrend(
          sum(buildSparkline('fork',         sevenDaysAgo,    7)),
          sum(buildSparkline('fork',         fourteenDaysAgo, 7)),
        ),
      },
    };
  }

  public async getTopRepositories(limit = 5) {
    const repos = await prisma.repository.findMany({
      where:   { isActive: true },
      orderBy: { stars: 'desc' },
      take:    limit,
      select: {
        id:       true,
        name:     true,
        language: true,
        stars:    true,
        isActive: true,
        workspace: {
          select: {
            owner: {
              select: { avatarUrl: true }
            }
          }
        }
      },
    });

    return repos.map(repo => ({
      id:            repo.id,
      name:          repo.name,
      language:      repo.language,
      stars:         repo.stars,
      status:        repo.isActive ? 'active' : 'inactive',
      ownerAvatarUrl: repo.workspace.owner.avatarUrl ?? '',
    }));
  }

  public async getCommitActivity(workspaceId: string) {
    return this.eventRepository.getCommitActivity(workspaceId);
  }

  public async getPendingReviews(userId: string, username: string) {
    const accessToken = await UserRepository.getAccessToken(userId);
    const octokit = octokitClient(accessToken);
  
    const [reviewRequested, authored] = await Promise.all([
      octokit.rest.search.issuesAndPullRequests({
        q: `is:pr is:open review-requested:${username}`,
        per_page: 10,
      }),
      octokit.rest.search.issuesAndPullRequests({
        q: `is:pr is:open author:${username}`,
        per_page: 10,
      }),
    ]);
  
    const mapPR = (pr: any, status: 'review' | 'changes') => ({
      id:             String(pr.id),
      title:          pr.title,
      repo:           pr.repository_url.split('/').slice(-1)[0],
      prNumber:       pr.number,
      additions:      0,
      deletions:      0,
      status,
      url:            pr.html_url,
      author:         pr.user?.login ?? 'unknown',
      authorAvatarUrl: pr.user?.avatar_url,
    });
  
    const reviewItems   = reviewRequested.data.items.map(pr => mapPR(pr, 'review'));
    const authoredItems = authored.data.items.map(pr => mapPR(pr, 'changes'));
  
    // Deduplicar por id por si aparece en ambas listas
    const seen = new Set<string>();
    return [...reviewItems, ...authoredItems].filter(pr => {
      if (seen.has(pr.id)) return false;
      seen.add(pr.id);
      return true;
    });
  }
}
