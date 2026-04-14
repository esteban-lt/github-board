export interface Repository {
  id: string;
  githubRepoId: number;
  name: string;
  fullName: string;
  description: string;
  isActive: boolean;
  isPrivate: boolean;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  languaje: string;
}
