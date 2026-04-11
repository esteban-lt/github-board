import { Router } from 'express';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { AuthRoutes } from './auth/routes';
import { GitHubRoutes } from './github/routes';
import { RepositoryRoutes } from './repositories/routes';

export class Routes {
  
  static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/github/repositories', AuthMiddleware.requireAuth, GitHubRoutes.routes);
    router.use('/api/repositories', AuthMiddleware.requireAuth, RepositoryRoutes.routes);

    return router;
  }
}
