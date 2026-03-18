import { Router } from 'express';
import { AuthController } from './controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export class AuthRoutes {

  static get routes() {

    const router = Router();

    router.get('/github', AuthController.githubRedirect);
    router.get('/github/callback', AuthController.githubCallback);
    router.post('/logout', AuthController.logout);
    router.get('/me', AuthMiddleware.requireAuth, AuthController.me);

    return router;
  }
}