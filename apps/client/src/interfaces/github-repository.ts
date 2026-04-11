export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  avatarUrl: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  ownerAvatarUrl: string;
  private: boolean;
}
