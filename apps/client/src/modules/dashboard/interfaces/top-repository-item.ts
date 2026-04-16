export interface TopRepositoryItem {
  id: string;
  name: string;
  language: string | null;
  stars: number;
  status: 'active' | 'inactive';
  ownerAvatarUrl?: string;
}
