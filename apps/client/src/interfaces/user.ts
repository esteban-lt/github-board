export interface User {
  userId: string;
  githubId: number;
  workspaceId: string;
  name: string | null;
  username: string;
  email: string | null;
  avatarUrl: string;
}
