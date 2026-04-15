export interface Repository {
  id: string;
  workspaceId: string;
  githubRepoId: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPullRequests: number;
  defaultBranch: string;
  isConnected: boolean;
  isActive: boolean;
  isPrivate: boolean;
  lastSyncedAt: Date;
}
