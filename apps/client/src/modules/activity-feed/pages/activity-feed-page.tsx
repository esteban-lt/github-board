import { useState, useMemo } from "react";
import { Header } from "@/components/app-pages/header";
import { FiltersCard } from "../components/filters-card";
import { ActivityFeed } from "../components/activity-feed";
import { useEvents } from "../hooks/use-events";
import { useActivityStream } from "../hooks/use-activity-stream";
import { useRepositories } from "@/modules/repositories/_hooks/use-repositories";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const ActivityFeedPage = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: repositoriesPage, isLoading: repositoriesLoading } = useRepositories({ limit: 1000 });
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

  const filtersProps = {
    events,
    repositories,
    isLoading: repositoriesLoading,
    selectedRepo,
    onRepoChange: setSelectedRepo,
    selectedPeople,
    onPeopleChange: setSelectedPeople,
  };

  return (
    <>
      <Header
        title="Activity Feed"
        description="Real-time activity across all your connected repositories"
      />

      {/* Mobile filter button — hidden on lg+ */}
      <div className="flex justify-end mb-2 lg:hidden">
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SlidersHorizontal className="size-4" />
              Filter
            </Button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            align="end"
            sideOffset={8}
            className="z-50 w-70 rounded-lg border border-border bg-popover p-0 shadow-md outline-none"
          >
            <FiltersCard {...filtersProps} />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">

        {/* Feed */}
        <ActivityFeed events={filteredEvents} isLoading={eventsLoading} />

        {/* Filters — hidden on small screens, visible on lg+ */}
        <div className="hidden lg:block">
          <FiltersCard {...filtersProps} />
        </div>

      </div>
    </>
  );
};

export default ActivityFeedPage;
