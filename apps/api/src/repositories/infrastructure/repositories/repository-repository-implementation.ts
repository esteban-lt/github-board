import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import type { GitHubRepository } from '../../domain/entities/github-repository';
import type { Repository } from '../../domain/entities/repository';
import type { RepositoryRepository } from '../../domain/repositories/repository-repository';
import type { PaginatedRepositories } from '../../domain/interfaces/paginated-repositories';
import type { GetRepositoriesDto } from '@repositories/domain/dtos/get-repositories-dto';

export class RepositoryRepositoryImplementation implements RepositoryRepository {

  constructor(
    private readonly repositoryDatasource: RepositoryDatasource
  ) {}

  public connect(githubRepoId: number, workspaceId: string, webhookId: number, githubRepository: GitHubRepository): Promise<Repository> {
    return this.repositoryDatasource.connect(githubRepoId, workspaceId, webhookId, githubRepository);
  }

  public disconnect(id: string): Promise<void> {
    return this.repositoryDatasource.disconnect(id);
  }

  public getAll(workspaceId: string, dto: GetRepositoriesDto): Promise<PaginatedRepositories> {
    return this.repositoryDatasource.getAll(workspaceId, dto);
  }

  public getById(id: string): Promise<Repository> {
    return this.repositoryDatasource.getById(id);
  }

  public getByGithubRepoId(githubRepoId: number): Promise<Repository | null> {
    return this.repositoryDatasource.getByGithubRepoId(githubRepoId);
  }

  public getByFullName(workspaceId: string, fullName: string): Promise<Repository | null> {
    return this.repositoryDatasource.getByFullName(workspaceId, fullName);
  }

  public setStatus(id: string, isActive: boolean): Promise<void> {
    return this.repositoryDatasource.setStatus(id, isActive);
  }

  public synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository> {
    return this.repositoryDatasource.synchronize(id, githubRepository);
  }
}
