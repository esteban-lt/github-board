import { prisma } from '@lib/prisma';
import { ResponseError } from '@lib/response-error';

import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import type { GitHubRepository } from '../../domain/entities/github-repository';
import { Repository } from '../../domain/entities/repository';
import { RepositoryMapper } from '../../domain/mappers/repository-mapper';
import type { GetRepositoriesDto } from '../../domain/dtos/get-repositories-dto';
import type { PaginatedRepositories } from '../../domain/interfaces/paginated-repositories';

const SORT_FIELD_MAP: Record<string, string> = {
  updated_at: 'updatedAt',
  stars: 'stars',
  forks: 'forks',
  name: 'name',
};

export class PostgresRepositoryDatasource implements RepositoryDatasource {

  private async run<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof ResponseError) throw error;
      console.log(error);
      throw ResponseError.internalServerError();
    }
  }

  public async connect(githubRepoId: number, workspaceId: string, webhookId: number, githubRepository: GitHubRepository): Promise<Repository> {
    return this.run(async () => {
      const existing = await prisma.repository.findFirst({
        where: { workspaceId, githubRepoId },
      });
    
      if (existing) {
        const repository = await prisma.repository.update({
          where: { id: existing.id },
          data: {
            isConnected: true,
            webhookId,
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
      }
    
      const repository = await prisma.repository.create({
        data: {
          githubRepoId,
          workspaceId,
          webhookId,
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
    });
  }

  public async disconnect(id: string): Promise<void> {
    return this.run(async () => {
      const repository = await prisma.repository.findUnique({ where: { id } });
      if (!repository) throw ResponseError.notFound('Repository not found');
      await prisma.repository.update({
        where: { id },
        data: { isConnected: false },
      });
    });
  }

  public async getAll(workspaceId: string, dto: GetRepositoriesDto): Promise<PaginatedRepositories> {
    return this.run(async () => {
      const { page, limit, search, language, sort, order } = dto;
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
    });
  }

  public async getById(id: string): Promise<Repository> {
    return this.run(async () => {
      const repository = await prisma.repository.findUnique({ where: { id } });
      if (!repository) throw ResponseError.notFound('Repository not found');
      return RepositoryMapper.fromObject(repository);
    });
  }

  public async getByGithubRepoId(githubRepoId: number): Promise<Repository | null> {
    return this.run(async () => {
      const repository = await prisma.repository.findFirst({ where: { githubRepoId } });
      return repository ? RepositoryMapper.fromObject(repository) : null;
    });
  }

  public async getByFullName(workspaceId: string, fullName: string): Promise<Repository | null> {
    return this.run(async () => {
      const repository = await prisma.repository.findFirst({ where: { workspaceId, fullName } });
      return repository ? RepositoryMapper.fromObject(repository) : null;
    });
  }

  public async setStatus(id: string, isActive: boolean): Promise<void> {
    return this.run(async () => {
      const repository = await prisma.repository.findUnique({ where: { id } });
      if (!repository) throw ResponseError.notFound('Repository not found');
      await prisma.repository.update({
        where: { id },
        data: { isActive },
      });
    });
  }

  public async synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository> {
    return this.run(async () => {
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
    });
  }
}
