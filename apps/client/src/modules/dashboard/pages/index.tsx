import { Header } from "@/components/app-pages/header";
import { StatGrid } from "../components/stat-grid";
import { Button } from "@/components/ui/button";
import { TopRepositories } from "../components/top-repositories";
import { RecentActivity } from "../components/recent-activity";
import { useDashboardStats } from "../hooks/use-dashboard-stats";
import { useTopRepositories } from "../hooks/use-top-repositories";
import { useEvents } from "@/modules/activity-feed/hooks/use-events";
import { useActivityStream } from "@/modules/activity-feed/hooks/use-activity-stream";
import type { DashboardStatCard } from "../interfaces/dashboard-stat-card";
import type { ActivityEvent } from "@/modules/activity-feed/components/activity-item";
import type { RecentActivityEvent } from "../interfaces/recent-activity-event";
import { RefreshCw } from "lucide-react";
import { PendingReviews } from "../components/pending-reviews";
import { CommitActivity } from "../components/commit-activity";
import { useNavigate } from "react-router";

const mockSparkline = [2, 5, 3, 8, 4, 9, 6];
const RECENT_ACTIVITY_LIMIT = 6;

const mapActivityEvent = (event: ActivityEvent, index: number): RecentActivityEvent => ({
  id: `${event.occurredAt}-${event.actor}-${index}`,
  username: event.actor,
  action: event.description ?? event.type,
  repositoryFullName: event.repo,
  date: new Date(event.occurredAt).toLocaleDateString(),
  eventType: event.type as RecentActivityEvent['eventType'],
});

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Index = () => {

  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: topRepositories, isLoading: topRepositoriesLoading } = useTopRepositories();
  const { data: events = [] } = useEvents();
  useActivityStream();

  const statsCards: DashboardStatCard[] = [
    { title: "Open PRs",     metric: stats?.openPullRequests ?? 0, sparkline: mockSparkline, trend: { value: 12, label: 'vs last week', type: 'percent' } },
    { title: "Open issues",  metric: stats?.openIssues ?? 0,       sparkline: mockSparkline, trend: { value: -3, label: 'vs last week', type: 'delta'   } },
    { title: "Commits · 7d", metric: stats?.commits7d ?? 0,        sparkline: mockSparkline, trend: { value: 18, label: 'vs last week', type: 'percent' } },
    { title: "Total stars",  metric: stats?.totalStars ?? 0,       sparkline: mockSparkline, trend: { value: 1,  label: 'this week',   type: 'delta'   } },
    { title: "Total forks",  metric: stats?.totalForks ?? 0,       sparkline: mockSparkline, caption: 'Across all repositories' },
  ];

  const recentActivity = events
    .slice(0, RECENT_ACTIVITY_LIMIT)
    .map(mapActivityEvent);

  return (
    <>
      <Header
        title={`${getGreeting()}, Esteban`}
        description="Monitor your GitHub repositories activity"
        actions={
          <div className="flex gap-2">
            <Button variant="outline"><RefreshCw /> Resync all</Button>
            <Button onClick={() => navigate('repositories/connect')}>Connect repository</Button>
          </div>
        }
      />

      <StatGrid stats={statsCards} isLoading={statsLoading} />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <PendingReviews />
        <CommitActivity />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <RecentActivity activity={recentActivity} />
        <TopRepositories
          repositories={topRepositories ?? []}
          isLoading={topRepositoriesLoading}
        />
      </div>
    </>
  );
};

export default Index;
