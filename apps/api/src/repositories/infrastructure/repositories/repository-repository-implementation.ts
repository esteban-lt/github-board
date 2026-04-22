import type { RepositoryDatasource } from '../../domain/datasources/repository-datasource';
import type { GitHubRepository } from '../../domain/entities/github-repository';
import type { Repository } from '../../domain/entities/repository';
import type { RepositoryRepository } from '../../domain/repositories/repository-repository';

export class RepositoryRepositoryImplementation implements RepositoryRepository {

  constructor(
    private readonly repositoryDatasource: RepositoryDatasource
  ) {}

  public connect(githubRepoId: number, workspaceId: string, githubRepository: GitHubRepository): Promise<Repository> {
    return this.repositoryDatasource.connect(githubRepoId, workspaceId, githubRepository);
  }

  public disconnect(id: string): Promise<void> {
    return this.repositoryDatasource.disconnect(id);
  }

  public getAll(workspaceId: string): Promise<Repository[]> {
    return this.repositoryDatasource.getAll(workspaceId);
  }

  public getById(id: string): Promise<Repository> {
    return this.repositoryDatasource.getById(id);
  }

  public getByGithubRepoId(githubRepoId: number): Promise<Repository | null> {
    return this.repositoryDatasource.getByGithubRepoId(githubRepoId);
  }

  public setStatus(id: string, isActive: boolean): Promise<void> {
    return this.repositoryDatasource.setStatus(id, isActive);
  }

  public synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository> {
    return this.repositoryDatasource.synchronize(id, githubRepository);
  }
}
