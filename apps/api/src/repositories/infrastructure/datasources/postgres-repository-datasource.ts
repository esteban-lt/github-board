import { prisma } from '@lib/prisma';
import { ResponseError } from '@lib/response-error';
import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import type { GitHubRepository } from '../../domain/entities/github-repository';
import { Repository } from '../../domain/entities/repository';
import { RepositoryMapper } from '../../domain/mappers/repository-mapper';
import type { GetRepositoriesParams, PaginatedRepositories } from '../../domain/types/repository-params';

const SORT_FIELD_MAP: Record<string, string> = {
  updated_at: 'updatedAt',
  stars: 'stars',
  forks: 'forks',
  name: 'name',
};

export class PostgresRepositoryDatasource implements RepositoryDatasource {

  public async connect(githubRepoId: number, workspaceId: string, githubRepository: GitHubRepository): Promise<Repository> {
    try {
      const repository = await prisma.repository.create({
        data: {
          githubRepoId,
          workspaceId,
          name: githubRepository.name,
          fullName: githubRepository.fullName,
          description: githubRepository.description,
          htmlUrl: githubRepository.htmlUrl,
          language: githubRepository.language,
          stars: githubRepository.stars,
          forks: githubRepository.forks,
          openIssues: githubRepository.openIssues,
          openPullRequests: githubRepository.openPullRequests,
          defaultBranch: githubRepository.defaultBranch,
          isPrivate: githubRepository.isPrivate,
          lastSyncedAt: new Date(),
        },
      });
      return RepositoryMapper.fromObject(repository);
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      console.log(error);
      throw ResponseError.internalServerError();
    }
  }

  public async disconnect(id: string): Promise<void> {
    await prisma.repository.update({
      where: { id },
      data: { isConnected: false },
    }).catch(() => {
      throw ResponseError.notFound('Repository not found');
    });
  }

  public async getAll(workspaceId: string, params: GetRepositoriesParams): Promise<PaginatedRepositories> {
    const { page, limit, search, language, sort, order } = params;
    const skip = (page - 1) * limit;
    const sortField = SORT_FIELD_MAP[sort] ?? sort;

    const where = {
      workspaceId,
      isConnected: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { fullName: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(language && { language }),
    };

    try {
      const [repositories, total] = await Promise.all([
        prisma.repository.findMany({
          where,
          orderBy: { [sortField]: order },
          skip,
          take: limit,
        }),
        prisma.repository.count({ where }),
      ]);

      return {
        data: repositories.map((r) => RepositoryMapper.fromObject(r)),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      console.log(error);
      throw ResponseError.internalServerError();
    }
  }

  public async getById(id: string): Promise<Repository> {
    try {
      const repository = await prisma.repository.findUnique({ where: { id }});
      if(!repository) throw ResponseError.notFound('Repository not found');
      return RepositoryMapper.fromObject(repository);
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      console.log(error);
      throw ResponseError.internalServerError();
    }
  }

  public async getByGithubRepoId(githubRepoId: number): Promise<Repository | null> {
    try {
      const repository = await prisma.repository.findFirst({ where: { githubRepoId } });
      if(!repository) throw ResponseError.notFound('Repository not found');
      return RepositoryMapper.fromObject(repository);
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      console.log(error);
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

  public async synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository> {
    try {
      const repository = await prisma.repository.update({
        where: { id },
        data: {
          name: githubRepository.name,
          fullName: githubRepository.fullName,
          description: githubRepository.description,
          htmlUrl: githubRepository.htmlUrl,
          language: githubRepository.language,
          stars: githubRepository.stars,
          forks: githubRepository.forks,
          openIssues: githubRepository.openIssues,
          openPullRequests: githubRepository.openPullRequests,
          defaultBranch: githubRepository.defaultBranch,
          isPrivate: githubRepository.isPrivate,
          lastSyncedAt: new Date(),
        },
      });
      return RepositoryMapper.fromObject(repository);
    } catch(error) {
      if(error instanceof ResponseError) throw error;
      throw ResponseError.internalServerError();
    }
  }
}
