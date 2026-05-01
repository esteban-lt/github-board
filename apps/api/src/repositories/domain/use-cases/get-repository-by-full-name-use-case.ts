import type { Repository } from "../entities/repository";
import type { RepositoryRepository } from "../repositories/repository-repository";

export class GetRepositoryByFullNameUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public execute(workspaceId: string, fullName: string): Promise<Repository | null> {
    return this.repositoryRepository.getByFullName(workspaceId, fullName);
  }
}
