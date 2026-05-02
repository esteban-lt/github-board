import { env } from '../plugins/env';
import type { GitHubUser } from '../interfaces/github-user';
import { AuthRepository } from './repository';

export class AuthService {

  private static getGitHubAccessToken = async (code: string): Promise<string> => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data: any = await response.json();
    if (data.error) throw new Error(data.error_description ?? 'GitHub OAuth error');
    return data.access_token;
  }

  private static getGitHubUser = async (accessToken: string) => {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch GitHub user');
    return response.json();
  }

  static handleGitHubCallback = async (code: string) => {
    const accessToken = await this.getGitHubAccessToken(code);
    const githubUser = await this.getGitHubUser(accessToken) as GitHubUser;
    const user = await AuthRepository.upsertUser(githubUser, accessToken);
    await AuthRepository.createPersonalWorkspace(user.id, githubUser.login);
    return user;
  }
}
