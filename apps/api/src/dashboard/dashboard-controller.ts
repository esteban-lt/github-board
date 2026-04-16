import type { Request, Response } from 'express';
import type { DashboardService } from './dashboard-service';

export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  public getStats = async (_req: Request, res: Response) => {
    const stats = await this.dashboardService.getStats();
    return res.status(200).json(stats);
  }

  public getTopRepositories = async (_req: Request, res: Response) => {
    const topRepositories = await this.dashboardService.getTopRepositories();
    return res.status(200).json(topRepositories);
  }
}
