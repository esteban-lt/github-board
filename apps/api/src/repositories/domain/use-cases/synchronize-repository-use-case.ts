import type { GitHubService } from '../../../github/service';
import type { Repository } from '../entities/repository';
import type { RepositoryRepository } from '../repositories/repository-repository';

export class SynchronizeRepositoryUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public async execute(id: string, githubService: GitHubService): Promise<Repository> {
    const currentRepository = await this.repositoryRepository.getById(id);
    const githubRepository = await githubService.getRepositoryById(currentRepository.githubRepoId);
    return this.repositoryRepository.synchronize(id, githubRepository);
  }
}
