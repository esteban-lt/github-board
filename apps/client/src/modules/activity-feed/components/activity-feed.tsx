import { useState, useMemo } from "react";
import { Activity } from "lucide-react";
import { ActivityItem } from "./activity-item";
import type { ActivityEvent } from "./activity-item";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TAB_FILTERS: { label: string; type: string | null }[] = [
  { label: "All",          type: null          },
  { label: "Commits",      type: "push"        },
  { label: "PRs",          type: "pull_request" },
  { label: "Issues",       type: "issues"      },
  { label: "Stars",        type: "star"        },
  { label: "Forks",        type: "fork"        },
];

const groupByDate = (events: ActivityEvent[]) => {
  const groups: Record<string, ActivityEvent[]> = {};

  for (const event of events) {
    const date = new Date(event.occurredAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let label: string;
    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else {
      label = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }

    if (!groups[label]) groups[label] = [];
    groups[label]!.push(event);
  }

  return groups;
};

const SKELETON_COUNT = 8;

interface Props {
  events: ActivityEvent[];
  isLoading: boolean;
}

export const ActivityFeed = ({ events, isLoading }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const countByType = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const event of events) {
      counts[event.type] = (counts[event.type] ?? 0) + 1;
    }
    return counts;
  }, [events]);

  const getTabCount = (type: string | null) => {
    if (type === null) return events.length;
    return countByType[type] ?? 0;
  };

  const filteredEvents = useMemo(() => {
    if (activeTab === null) return events;
    return events.filter(e => e.type === activeTab);
  }, [events, activeTab]);

  const grouped = useMemo(() => groupByDate(filteredEvents), [filteredEvents]);

  return (
    <Card className="overflow-hidden p-0 gap-0">
    
      {/* Tabs */}
      <div className="flex items-center gap-1 flex-wrap px-4 py-3">
        {TAB_FILTERS.map(tab => {
          const count = getTabCount(tab.type);
          const isActive = activeTab === tab.type;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              <span className={`text-xs ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Loading skeleton */}
      {isLoading ? (
        <div className="divide-y">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-3.5">
              <Skeleton className="size-8 rounded-full shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-3.5 w-56" />
                  <Skeleton className="h-3 w-12 shrink-0" />
                </div>
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Activity className="size-8 text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No activity yet</p>
          <p className="text-xs text-muted-foreground mt-1">Events from your connected repositories will appear here</p>
        </div>
      ) : (
        <>
          {/* Grouped events */}
          {Object.entries(grouped).map(([dateLabel, dateEvents]) => (
            <div key={dateLabel}>
              <div className="px-4 py-2 border-b border-t flex items-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {dateLabel} · {dateEvents.length} {dateEvents.length === 1 ? "event" : "events"}
                </span>
              </div>
              <div className="divide-y">
                {dateEvents.map((event, index) => (
                  <ActivityItem key={index} event={event} />
                ))}
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium">No events found</p>
              <p className="text-xs text-muted-foreground mt-1">Try selecting a different filter</p>
            </div>
          )}
        </>
      )}
  
    </Card>
  );
};
