import type { Repository } from '../entities/repository';
import type { RepositoryRepository } from '../repositories/repository-repository';

export class GetRepositoryByIdUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public execute(id: string): Promise<Repository> {
    return this.repositoryRepository.getById(id);
  }
}
