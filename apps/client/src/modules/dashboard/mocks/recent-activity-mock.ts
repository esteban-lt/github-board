import type { RecentActivityEvent } from "../interfaces/recent-activity-event";

export const recentActivityMock: RecentActivityEvent[] = [
  {
    id: "1",
    username: "johnsmith",
    action: "starred the repository",
    repositoryFullName: "esteban-lt/awesome-dashboard",
    date: "15/1/2024",
    eventType: "star",
  },
  {
    id: "2",
    username: "sarah",
    action: "opened pull request #45: Add rate limiting middleware",
    repositoryFullName: "esteban-lt/api-gateway",
    date: "15/1/2024",
    eventType: "pull_request",
  },
  {
    id: "3",
    username: "mikecd",
    action: "closed issue #128: Navigation bug on Android",
    repositoryFullName: "esteban-lt/mobile-app",
    date: "15/1/2024",
    eventType: "issue",
  },
  {
    id: "4",
    username: "designlead",
    action: "pushed 3 commits to main branch",
    repositoryFullName: "esteban-lt/design-system",
    date: "14/1/2024",
    eventType: "push",
  },
  {
    id: "5",
    username: "devi",
    action: "forked the repository",
    repositoryFullName: "esteban-lt/awesome-dashboard",
    date: "14/1/2024",
    eventType: "fork",
  },
];
