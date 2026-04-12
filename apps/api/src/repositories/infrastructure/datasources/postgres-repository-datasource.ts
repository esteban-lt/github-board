import { prisma } from '../../../../lib/prisma';
import { ResponseError } from '../../../shared/lib/response-error';
import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import { Repository } from '../../domain/entities/repository';
import type { GitHubRepositoryData } from '../../domain/interfaces/github-repository-data';

export class PostgresRepositoryDatasource implements RepositoryDatasource {

  public async connect(githubRepoId: number, workspaceId: string, githubRepositoryData: GitHubRepositoryData): Promise<Repository> {
    console.log({ githubRepoId, workspaceId, githubRepositoryData });
    const created = await prisma.repository.create({
      data: {
        githubRepoId,
        workspaceId,
        name: githubRepositoryData.name,
        fullName: githubRepositoryData.fullName,
        description: githubRepositoryData.description,
        htmlUrl: githubRepositoryData.htmlUrl,
        defaultBranch: githubRepositoryData.defaultBranch,
        isPrivate: githubRepositoryData.isPrivate,
        lastSyncedAt: new Date(),
      },
    });

    return new Repository({
      id: created.id,
      workspaceId: created.workspaceId,
      githubRepoId: Number(created.githubRepoId),
      name: created.name,
      fullName: created.fullName,
      description: created.description ?? '',
      htmlUrl: created.htmlUrl ?? '',
      defaultBranch: created.defaultBranch,
      isActive: created.isActive,
      isPrivate: created.isPrivate,
      lastSyncedAt: created.lastSyncedAt ?? new Date(),
    });
  }

  public async getAll(workspaceId: string): Promise<Repository[]> {
    try {
      const repositories = await prisma.repository.findMany({
        where: {
          workspaceId,
        },
      });

      return repositories.map((repository) => new Repository({
        id: repository.id,
        workspaceId: repository.workspaceId,
        githubRepoId: Number(repository.githubRepoId),
        name: repository.name,
        fullName: repository.fullName,
        description: repository.description ?? '',
        htmlUrl: repository.htmlUrl ?? '',
        defaultBranch: repository.defaultBranch,
        isActive: repository.isActive,
        isPrivate: repository.isPrivate,
        lastSyncedAt: repository.lastSyncedAt ?? new Date(),
      }));
    } catch(error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Repository> {
    try {
      const repository = await prisma.repository.findUnique({ where: { id }});
      if(!repository) throw ResponseError.notFound('Repository not found');

      return new Repository({
        id: repository.id,
        workspaceId: repository.workspaceId,
        githubRepoId: Number(repository.githubRepoId),
        name: repository.name,
        fullName: repository.fullName,
        description: repository.description ?? '',
        htmlUrl: repository.htmlUrl ?? '',
        defaultBranch: repository.defaultBranch,
        isActive: repository.isActive,
        isPrivate: repository.isPrivate,
        lastSyncedAt: repository.lastSyncedAt ?? new Date(),
      });
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      throw ResponseError.internalServerError();
    }
  }

  public async setStatus(id: string, isActive: boolean): Promise<void> {
    await prisma.repository.update({
      where: { id },
      data: { isActive },
    }).catch(() => {
      throw ResponseError.notFound('Repository not found');
    });
  }

  public synchronize(id: string): Promise<Repository> {
    throw new Error("Method not implemented.");
  }
}
