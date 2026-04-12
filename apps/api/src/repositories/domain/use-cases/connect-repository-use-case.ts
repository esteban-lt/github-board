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
    const githubData = await githubService.getRepositoryById(githubRepoId);
    return this.repositoryRepository.connect(githubRepoId, workspaceId, {
      name: githubData.name,
      fullName: githubData.fullName,
      description: githubData.description,
      htmlUrl: githubData.htmlUrl,
      defaultBranch: githubData.defaultBranch,
      isPrivate: githubData.private,
    });
  }
}
