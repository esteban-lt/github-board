import type { Request, Response } from 'express';
import type { DashboardService } from './dashboard-service';

export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  public getStats = async (req: Request, res: Response) => {
    const workspaceId = req.user?.workspaceId!;
    const stats = await this.dashboardService.getStats(workspaceId);
    return res.status(200).json(stats);
  }

  public getTopRepositories = async (_req: Request, res: Response) => {
    const topRepositories = await this.dashboardService.getTopRepositories();
    return res.status(200).json(topRepositories);
  }

  public getCommitActivity = async (req: Request, res: Response) => {
    const workspaceId = req.user?.workspaceId!;
    const data = await this.dashboardService.getCommitActivity(workspaceId);
    return res.status(200).json(data);
  }
}
