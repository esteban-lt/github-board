import type { GitHubService } from '@github/service';
import type { RepositoryRepository } from '../repositories/repository-repository';

export class DisconnectRepositoryUseCase {
  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public async execute(id: string, githubService: GitHubService): Promise<void> {
    const repository = await this.repositoryRepository.getById(id);
    const [owner, repo] = repository.fullName.split('/');
    await githubService.deleteWebhook(owner!, repo!, repository.webhookId);
    await this.repositoryRepository.disconnect(id);
  }
}
