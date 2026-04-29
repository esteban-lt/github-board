import type { Request, Response } from 'express';
import { GitHubService } from './service';
import { UserRepository } from '@users/user-repository';

const VALID_SORTS = ['updated', 'created', 'pushed', 'full_name'] as const;
type ValidSort = typeof VALID_SORTS[number];

export class GitHubController {

  static listGithubRepositories = async (request: Request, response: Response) => {
    try {
      const userId = request.user!.userId;
      const page = Math.max(1, parseInt(request.query.page as string) || 1);
      const per_page = Math.min(100, Math.max(1, parseInt(request.query.per_page as string) || 30));
      const search = (request.query.search as string) || undefined;
      const rawSort = request.query.sort as string;
      const sort: ValidSort = VALID_SORTS.includes(rawSort as ValidSort) ? (rawSort as ValidSort) : 'updated';
      const direction: 'asc' | 'desc' = request.query.direction === 'asc' ? 'asc' : 'desc';

      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const result = await githubService.getRepositories({ page, per_page, sort, direction, search });
      return response.status(200).json({ ok: true, ...result });
    }
    catch(error) {
      return response.status(500).json({ ok: false, message: 'Error fetching GitHub repositories' });
    }
  }
}
