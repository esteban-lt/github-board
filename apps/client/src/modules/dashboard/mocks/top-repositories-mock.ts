import type { TopRepositoryItem } from "../interfaces/top-repository-item";

export const topRepositoriesMock: TopRepositoryItem[] = [
  {
    id: "1",
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    name: "awesome-dashboard",
    language: "TypeScript",
    stars: 1247,
    status: "active",
  },
  {
    id: "2",
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
    name: "api-gateway",
    language: "JavaScript",
    stars: 856,
    status: "inactive",
  },
  {
    id: "3",
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
    name: "mobile-app",
    language: "TypeScript",
    stars: 2103,
    status: "inactive",
  },
  {
    id: "4",
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4?v=4",
    name: "design-system",
    language: "TypeScript",
    stars: 567,
    status: "active",
  },
];
