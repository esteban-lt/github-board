import type { Repository } from '../entities/repository';
import type { GitHubRepository } from '../entities/github-repository';
import type { GetRepositoriesDto } from '../dtos/get-repositories-dto';
import type { PaginatedRepositories } from '../interfaces/paginated-repositories';

export interface RepositoryRepository {
  connect(githubRepoId: number, workspaceId: string, webhookId: number, gitHubRepository: GitHubRepository): Promise<Repository>;
  disconnect(id: string): Promise<void>;
  getAll(workspaceId: string, dto: GetRepositoriesDto): Promise<PaginatedRepositories>;
  getById(id: string): Promise<Repository>;
  getByGithubRepoId(githubRepoId: number): Promise<Repository | null>;
  getByFullName(workspaceId: string, fullName: string): Promise<Repository | null>;
  setStatus(id: string, isActive: boolean): Promise<void>;
  synchronize(id: string, githubRepository: GitHubRepository): Promise<Repository>;
}
