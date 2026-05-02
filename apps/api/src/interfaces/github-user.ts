export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string | null;
  avatar_url: string;
}
