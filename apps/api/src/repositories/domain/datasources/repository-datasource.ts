import type { Repository } from '../entities/repository';
import type { GitHubRepository } from '../entities/github-repository';

export interface RepositoryDatasource {
  connect(githubRepoId: number, workspaceId: string, gitHubRepository: GitHubRepository): Promise<Repository>;
  disconnect(id: string): Promise<void>;
  getAll(workspaceId: string): Promise<Repository[]>;
  getById(id: string): Promise<Repository>;
  getByGithubRepoId(githubRepoId: number): Promise<Repository | null>;
  setStatus(id: string, isActive: boolean): Promise<void>;
  synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository>;
}
