import type { Octokit } from "octokit";
import octokitClient from "../plugins/octokit-client"

export class GitHubService {

  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = octokitClient(accessToken);
  }
  
  public getRepositories = async () => {
    const { data } = await this.octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    });

    return data.map((githubRepository) => ({
      id: githubRepository.id,
      name: githubRepository.name,
      fullName: githubRepository.full_name,
      description: githubRepository.description,
      private: githubRepository.private,
      htmlUrl: githubRepository.html_url,
      language: githubRepository.language,
      stargazersCount: githubRepository.stargazers_count,
      forksCount: githubRepository.forks_count,
      ownerAvatarUrl: githubRepository.owner.avatar_url,
      updatedAt: githubRepository.updated_at,
    }));
  }

  public getRepositoryById = async (id: number) => {
    const { data } = await this.octokit.request('GET /repositories/{id}', {
      id: id,
    });

    return {
      githubId: data.id,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      private: data.private,
      htmlUrl: data.html_url,
      language: data.language,
      stargazersCount: data.stargazers_count,
      forksCount: data.forks_count,
      ownerLogin: data.owner.login,
      ownerAvatarUrl: data.owner.avatar_url,
      updatedAt: data.updated_at,
    };
  }
}
