export interface DashboardStatsResponse {
  totalStars: number;
  totalForks: number;
  openIssues: number;
  openPullRequests: number;
  activeRepositories: number;
  totalRepositories: number;
  commits7d: number;
  sparklines: {
    commits: number[];
    openIssues: number[];
    openPRs: number[];
    totalStars: number[];
    totalForks: number[];
  };
  trends: {
    commits: number | null;
    openIssues: number | null;
    openPRs: number | null;
    totalStars: number | null;
    totalForks: number | null;
  };
}
