import type { Request, Response } from 'express';
import { GitHubService } from './service';
import { UserRepository } from '../users/repository';

export class GitHubController {

  static listGithubRepositories = async (request: Request, response: Response) => {
    try {
      const userId = request.user!.userId;
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const githubRepositories = await githubService.getRepositories();
      return response.status(200).json({ ok: true, data: githubRepositories });
    }
    catch(error) {
      return response.status(500).json({ ok: false, message: 'Error fetching GitHub repositories' });
    }
  }
}
