export interface GitHubRepositoryData {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  defaultBranch: string;
  isPrivate: boolean;
}
