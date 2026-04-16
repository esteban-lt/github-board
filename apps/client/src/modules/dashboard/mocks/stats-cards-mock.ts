import { CircleDot, GitFork, GitPullRequest, Star } from "lucide-react";
import type { DashboardStatCard } from "../interfaces/dashboard-stat-card";

export const statsCardsMock: DashboardStatCard[] = [
  {
    title: "Total stars",
    metric: 4773,
    caption: "+12% from last month",
    icon: Star,
    iconClassName: "text-yellow-500",
  },
  {
    title: "Total forks",
    metric: 525,
    caption: "+8% from last month",
    icon: GitFork,
    iconClassName: "text-blue-500",
  },
  {
    title: "Open issues",
    metric: 48,
    caption: "-5% from last week",
    icon: CircleDot,
    iconClassName: "text-purple-500",
  },
  {
    title: "Open PRs",
    metric: 17,
    caption: "+3% from last week",
    icon: GitPullRequest,
    iconClassName: "text-green-500",
  },
];
