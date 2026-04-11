import { prisma } from '../../lib/prisma';

export class RepositoryRepository {

  static create = async (workspaceId: string, data: {
    githubRepoId: number,
    name: string,
    fullName: string,
    description: string,
    htmlUrl: string,
    defaultBranch: string,
    isPrivate: boolean,
    lastSyncedAt: string,
  }) => {
    await prisma.repository.create({
      data: {
        workspaceId,
        githubRepoId: data.githubRepoId,
        name: data.name,
        fullName: data.fullName,
        description: data.description,
        htmlUrl: data.htmlUrl,
        defaultBranch: data.defaultBranch,
        isPrivate: data.isPrivate,
        lastSyncedAt: data.lastSyncedAt,
      }
    });
  }
}
