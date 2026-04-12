import type { Repository } from '../entities/repository';
import type { GitHubRepositoryData } from '../interfaces/github-repository-data';

export interface RepositoryRepository {
  connect(githubRepoId: number, workspaceId: string, gitHubRepositoryData: GitHubRepositoryData): Promise<Repository>;
  getAll(workspaceId: string): Promise<Repository[]>;
  getById(id: string): Promise<Repository>;
  setStatus(id: string, isActive: boolean): Promise<void>;
  synchronize(id: string): Promise<Repository>;
}
