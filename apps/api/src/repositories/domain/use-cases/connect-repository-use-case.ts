import type { GitHubService } from "../../../github/service";
import type { Repository } from "../entities/repository";
import type { RepositoryRepository } from "../repositories/repository-repository";

export class ConnectRepositoryUseCase {

  constructor(
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public async execute(
    githubRepoId: number,
    workspaceId: string,
    githubService: GitHubService,
  ): Promise<Repository> {
    const githubRepository = await githubService.getRepositoryById(githubRepoId);
    return this.repositoryRepository.connect(githubRepoId, workspaceId, {
      id: githubRepository.id,
      name: githubRepository.name,
      fullName: githubRepository.fullName,
      description: githubRepository.description,
      htmlUrl: githubRepository.htmlUrl,
      defaultBranch: githubRepository.defaultBranch,
      isPrivate: githubRepository.isPrivate,
      language: githubRepository.language,
      stars: githubRepository.stars,
      forks: githubRepository.forks,
      openIssues: githubRepository.openIssues,
      openPullRequests: githubRepository.openPullRequests,
      ownerAvatarUrl: githubRepository.ownerAvatarUrl,
    });
  }
}
