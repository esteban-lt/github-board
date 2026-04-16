import { Router } from 'express';
import { DashboardController } from './dashboard-controller';
import { DashboardService } from './dashboard-service';
import { DashboardRepository } from './dashboard-repository';

export class DashboardRoutes {

  public static get routes() {
    const router = Router();
    const dashboardRepository = new DashboardRepository();
    const dashboardService = new DashboardService(dashboardRepository);
    const dashboardController = new DashboardController(dashboardService);

    router.get('/stats', dashboardController.getStats);
    router.get('/top-repositories', dashboardController.getTopRepositories);
    // router.use('/api/dashboard/recent-activity');

    return router;
  }
}
