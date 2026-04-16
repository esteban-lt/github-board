import type { DashboardRepository } from './dashboard-repository';

export class DashboardService {

  constructor(
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  public getStats() {
    return this.dashboardRepository.getStats();
  }

  public getTopRepositories() {
    return this.dashboardRepository.getTopRepositories();
  }
}
