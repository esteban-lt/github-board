import { Star, GitPullRequest, CircleDot, GitCommitHorizontal, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecentActivityEvent } from "../interfaces/recent-activity-event";

const eventConfig: Record<RecentActivityEvent['eventType'], { icon: React.ElementType; className: string }> = {
  star:         { icon: Star,                className: "text-yellow-500 bg-yellow-50"  },
  pull_request: { icon: GitPullRequest,      className: "text-green-500 bg-green-50"   },
  issues:        { icon: CircleDot,           className: "text-red-500 bg-red-50"       },
  push:         { icon: GitCommitHorizontal, className: "text-purple-500 bg-purple-50" },
  fork:         { icon: GitFork,             className: "text-blue-500 bg-blue-50"     },
};

export const RecentActivityItem = ({ username, action, repositoryFullName, date, eventType }: RecentActivityEvent) => {
  const { icon: Icon, className } = eventConfig[eventType];

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-full", className)}>
          <Icon className="size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">
            <span className="font-semibold">{username}</span> {action}
          </span>
          <span className="text-xs text-muted-foreground">{repositoryFullName}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">{date}</span>
    </div>
  );
};
