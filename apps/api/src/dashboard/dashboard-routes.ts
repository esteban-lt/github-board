import { Router } from 'express';
import { DashboardController } from './dashboard-controller';
import { DashboardService } from './dashboard-service';
import { DashboardRepository } from './dashboard-repository';
import { AuthMiddleware } from '@middlewares/auth-middleware';
import { EventRepository } from '@events/event-repository';

export class DashboardRoutes {

  public static get routes() {
    const router = Router();
    const eventRepository = new EventRepository();
    const dashboardRepository = new DashboardRepository(eventRepository);
    const dashboardService = new DashboardService(dashboardRepository);
    const dashboardController = new DashboardController(dashboardService);

    router.get('/stats', AuthMiddleware.requireAuth, dashboardController.getStats);
    router.get('/top-repositories', AuthMiddleware.requireAuth, dashboardController.getTopRepositories);
    router.get('/commit-activity', AuthMiddleware.requireAuth, dashboardController.getCommitActivity)
    // router.use('/api/dashboard/recent-activity');

    return router;
  }
}
