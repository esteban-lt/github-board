import type { DashboardRepository } from './dashboard-repository';

export class DashboardService {

  constructor(
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  public getStats(workspaceId: string) {
    return this.dashboardRepository.getStats(workspaceId);
  }


  public getTopRepositories() {
    return this.dashboardRepository.getTopRepositories();
  }

  public getCommitActivity(workspaceId: string) {
    return this.dashboardRepository.getCommitActivity(workspaceId);
  }
}
