import { useState, useMemo } from "react";
import { Header } from "@/components/app-pages/header";
import { FiltersCard } from "../components/filters-card";
import { ActivityFeed } from "../components/activity-feed";
import { useEvents } from "../hooks/use-events";
import { useActivityStream } from "../hooks/use-activity-stream";
import { useRepositories } from "@/modules/repositories/hooks/use-repositories";

const ActivityFeedPage = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const { data: events = [] } = useEvents();
  const { data: repositoriesPage } = useRepositories({ limit: 1000 });
  const repositories = repositoriesPage?.data ?? [];
  useActivityStream();

  console.log(repositories);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (selectedRepo !== null && event.repo !== selectedRepo) return false;
      if (selectedPeople.length > 0 && !selectedPeople.includes(event.actor)) return false;
      return true;
    });
  }, [events, selectedRepo, selectedPeople]);

  return (
    <>
      <Header
        title="Activity Feed"
        description="Real-time activity across all your connected repositories"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">

        {/* Feed */}
        <ActivityFeed events={filteredEvents} />

        {/* Filters */}
        <FiltersCard
          events={events}
          repositories={repositories}
          selectedRepo={selectedRepo}
          onRepoChange={setSelectedRepo}
          selectedPeople={selectedPeople}
          onPeopleChange={setSelectedPeople}
        />

      </div>
    </>
  );
};

export default ActivityFeedPage;
