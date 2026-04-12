import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import type { Repository } from '../../domain/entities/repository';
import type { GitHubRepositoryData } from '../../domain/interfaces/github-repository-data';
import type { RepositoryRepository } from '../../domain/repositories/repository-repository';

export class RepositoryRepositoryImplementation implements RepositoryRepository {

  constructor(
    private readonly repositoryDatasource: RepositoryDatasource
  ) {}

  public connect(githubRepoId: number, workspaceId: string, githubRepositoryData: GitHubRepositoryData): Promise<Repository> {
    return this.repositoryDatasource.connect(githubRepoId, workspaceId, githubRepositoryData);
  }

  public getAll(workspaceId: string): Promise<Repository[]> {
    return this.repositoryDatasource.getAll(workspaceId);
  }

  public getById(id: string): Promise<Repository> {
    return this.repositoryDatasource.getById(id);
  }

  public setStatus(id: string, isActive: boolean): Promise<void> {
    return this.repositoryDatasource.setStatus(id, isActive);
  }

  public synchronize(id: string): Promise<Repository> {
    return this.repositoryDatasource.synchronize(id);
  }
}
