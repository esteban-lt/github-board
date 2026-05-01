import type { Repository } from "@/interfaces/repository";
import { StatCard } from "./stat-card";

interface Props {
  repository: Repository;
  // isLoading: boolean;
}

export const StatsGrid = ({ repository }: Props) => {
  
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <StatCard title="Open PRs" value={repository.openPullRequests} />
      <StatCard title="Open issues" value={repository.openIssues} />
      <StatCard title="Stars" value={repository.stars} />
      <StatCard title="Forks" value={repository.forks} />
      <StatCard title="Watchers" value={5} />
      <StatCard title="Contributors" value={2} />
    </div>
  );
}
