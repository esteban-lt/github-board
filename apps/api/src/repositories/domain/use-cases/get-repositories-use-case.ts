import type { RepositoryRepository } from '../repositories/repository-repository';
import type { PaginatedRepositories } from '../interfaces/paginated-repositories';
import type { GetRepositoriesDto } from '../dtos/get-repositories-dto';

export class GetRepositoriesUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository
  ) {}

  public execute(workspaceId: string, dto: GetRepositoriesDto): Promise<PaginatedRepositories> {
    return this.repositoryRepository.getAll(workspaceId, dto);
  }
}
