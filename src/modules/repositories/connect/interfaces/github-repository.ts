export interface GitHubRepository {
  id: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  isPrivate: boolean;
}
