import { Header } from "@/components/app-pages/header";
import { StatGrid } from "../components/stat-grid";
import { Button } from "@/components/ui/button";
import { TopRepositories } from "../components/top-repositories";
import { RecentActivity } from "../components/recent-activity";
import { recentActivityMock } from "../mocks/recent-activity-mock";
import { useDashboardStats } from "../hooks/use-dashboard-stats";
import { useTopRepositories } from "../hooks/use-top-repositories";
import { CircleDot, GitFork, GitPullRequest, Star } from "lucide-react";
import type { DashboardStatCard } from "../interfaces/dashboard-stat-card";

const Index = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: topRepositories, isLoading: topRepositoriesLoading } = useTopRepositories();

  const statsCards: DashboardStatCard[] = [
    { title: "Total stars", metric: stats?.totalStars ?? 0, caption: "Across all repositories", icon: Star, iconClassName: "text-yellow-500" },
    { title: "Total forks", metric: stats?.totalForks ?? 0, caption: "Across all repositories", icon: GitFork, iconClassName: "text-blue-500"   },
    { title: "Open issues", metric: stats?.openIssues ?? 0, caption: "Pending resolution", icon: CircleDot, iconClassName: "text-purple-500" },
    { title: "Open PRs", metric: stats?.openPullRequests ?? 0, caption: "Awaiting review", icon: GitPullRequest, iconClassName: "text-green-500"  },
  ];

  return (
    <>
      <Header
        title="Dashboard"
        description="Monitor your GitHub repositories activity"
        actions={<Button>Connect repository</Button>}
      />

      <StatGrid
        stats={statsCards}
        isLoading={statsLoading}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RecentActivity activity={recentActivityMock} />
        <TopRepositories
          repositories={topRepositories ?? []}
          isLoading={topRepositoriesLoading}
        />
      </div>
    </>
  );
};

export default Index;
