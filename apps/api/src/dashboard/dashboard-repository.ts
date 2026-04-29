import type { EventRepository } from '@events/event-repository';
import { prisma } from '@lib/prisma';

export class DashboardRepository {

  constructor(
    private readonly eventRepository: EventRepository,
  ) {}

  public async getStats(workspaceId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    const [stars, forks, issues, pullRequests, activeRepos, totalRepos, commits7d] = await Promise.all([
      prisma.repository.aggregate({ _sum: { stars: true }, where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { forks: true }, where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { openIssues: true }, where: { workspaceId, isActive: true } }),
      prisma.repository.aggregate({ _sum: { openPullRequests: true }, where: { workspaceId, isActive: true } }),
      prisma.repository.count({ where: { workspaceId, isActive: true } }),
      prisma.repository.count({ where: { workspaceId, isConnected: true } }),
      prisma.event.count({
        where: {
          workspaceId,
          type: 'push',
          occurredAt: { gte: sevenDaysAgo },
        },
      }),
    ]);
  
    return {
      totalStars: stars._sum.stars ?? 0,
      totalForks: forks._sum.forks ?? 0,
      openIssues: issues._sum.openIssues ?? 0,
      openPullRequests: pullRequests._sum.openPullRequests ?? 0,
      activeRepositories: activeRepos,
      totalRepositories: totalRepos,
      commits7d,
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
}
