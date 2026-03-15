import { Router } from 'express';

export class Routes {
  
  static get routes() {
    const router = Router();

    router.get('/test', (request, response) => response.json('ok'));

    return router;
  }
}
