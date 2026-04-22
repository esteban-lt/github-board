import { prisma } from '@lib/prisma';

export class DashboardRepository {

  public async getStats() {
    const [stars, forks, issues, pullRequests, activeRepos] = await Promise.all([
      prisma.repository.aggregate({ _sum: { stars: true }, where: { isActive: true } }),
      prisma.repository.aggregate({ _sum: { forks: true }, where: { isActive: true } }),
      prisma.repository.aggregate({ _sum: { openIssues: true }, where: { isActive: true } }),
      prisma.repository.aggregate({ _sum: { openPullRequests: true }, where: { isActive: true } }),
      prisma.repository.count({ where: { isActive: true } }),
    ]);

    return {
      totalStars: stars._sum.stars ?? 0,
      totalForks: forks._sum.forks ?? 0,
      openIssues: issues._sum.openIssues ?? 0,
      openPullRequests: pullRequests._sum.openPullRequests ?? 0,
      activeRepositories: activeRepos,
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
}
