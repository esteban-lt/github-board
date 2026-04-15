import type { Repository } from '../entities/repository';
import type { GitHubRepository } from '../entities/github-repository';

export interface RepositoryRepository {
  connect(githubRepoId: number, workspaceId: string, gitHubRepository: GitHubRepository): Promise<Repository>;
  disconnect(id: string): Promise<void>;
  getAll(workspaceId: string): Promise<Repository[]>;
  getById(id: string): Promise<Repository>;
  setStatus(id: string, isActive: boolean): Promise<void>;
  synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository>;
}
