import { Router } from 'express';
import { GitHubController } from './controller';

export class GitHubRoutes {
  static get routes() {
    const router = Router();

    router.get('/', GitHubController.listGithubRepositories);

    return router;
  }
}
