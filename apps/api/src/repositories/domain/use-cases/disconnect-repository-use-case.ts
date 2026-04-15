import type { RepositoryRepository } from '../repositories/repository-repository';

export class DisconnectRepositoryUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public execute(id: string): Promise<void> {
    return this.repositoryRepository.disconnect(id);
  }
}
