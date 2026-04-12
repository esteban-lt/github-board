import type { Repository } from '../entities/repository';
import type { RepositoryRepository } from '../repositories/repository-repository';

export class GetRepositoriesUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository
  ) {}

  public execute(workspaceId: string): Promise<Repository[]> {
    return this.repositoryRepository.getAll(workspaceId);
  }
}
