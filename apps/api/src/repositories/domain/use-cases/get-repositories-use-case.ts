import type { RepositoryRepository } from '../repositories/repository-repository';
import type { GetRepositoriesParams, PaginatedRepositories } from '../types/repository-params';

export class GetRepositoriesUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository
  ) {}

  public execute(workspaceId: string, params: GetRepositoriesParams): Promise<PaginatedRepositories> {
    return this.repositoryRepository.getAll(workspaceId, params);
  }
}
