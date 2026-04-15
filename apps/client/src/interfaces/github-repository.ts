export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPullRequests: number;
  defaultBranch: string;
  ownerAvatarUrl: string;
  isPrivate: boolean;
}
