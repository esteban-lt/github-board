import { Repository } from '../entities/repository';

export class RepositoryMapper {

  public static fromObject(object: any): Repository {
    return new Repository({
      id: object.id,
      workspaceId: object.workspaceId,
      githubRepoId: Number(object.githubRepoId),
      webhookId: Number(object.webhookId),
      name: object.name,
      fullName: object.fullName,
      description: object.description ?? null,
      htmlUrl: object.htmlUrl,
      language: object.language ?? null,
      stars: object.stars ?? 0,
      forks: object.forks ?? 0,
      openIssues: object.openIssues ?? 0,
      openPullRequests: object.openPullRequests ?? 0,
      defaultBranch: object.defaultBranch,
      isConnected: object.isConnected ?? true,
      isActive: object.isActive,
      isPrivate: object.isPrivate,
      lastSyncedAt: object.lastSyncedAt ?? new Date(),
    });
  }
}