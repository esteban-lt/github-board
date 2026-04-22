import type { Octokit } from 'octokit';
import octokitClient from '@plugins/octokit-client';
import { env } from '@plugins/env';

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

    return data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      isPrivate: repo.private,
      htmlUrl: repo.html_url,
      defaultBranch: repo.default_branch,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      openPullRequests: 0, // no disponible en listForAuthenticatedUser
      ownerAvatarUrl: repo.owner.avatar_url,
      updatedAt: repo.updated_at,
    }));
  }

  public getRepositoryById = async (id: number) => {
    const { data } = await this.octokit.request('GET /repositories/{id}', { id });

    return {
      id: data.id,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      isPrivate: data.private,
      htmlUrl: data.html_url,
      defaultBranch: data.default_branch,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      openPullRequests: 0, // requiere un endpoint adicional
      ownerLogin: data.owner.login,
      ownerAvatarUrl: data.owner.avatar_url,
      updatedAt: data.updated_at,
    };
  }

  public async registerWebhook(owner: string, repo: string, webhookUrl: string): Promise<void> {
    await this.octokit.request('POST /repos/{owner}/{repo}/hooks', {
      owner,
      repo,
      name: 'web',
      active: true,
      events: ['push', 'pull_request', 'issues', 'star', 'fork'],
      config: {
        url: webhookUrl,
        content_type: 'json',
        secret: env.GITHUB_WEBHOOK_SECRET,
      },
    });
  }
}
