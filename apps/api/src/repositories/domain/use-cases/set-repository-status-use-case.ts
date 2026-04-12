import { ResponseError } from "../../../shared/lib/response-error";
import type { RepositoryRepository } from "../repositories/repository-repository";

export class SetRepositoryStatusUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const repository = await this.repositoryRepository.getById(id);
    if(!repository) throw ResponseError.notFound('Repository not found');
    return this.repositoryRepository.setStatus(id, !repository.isActive);
  }
}
