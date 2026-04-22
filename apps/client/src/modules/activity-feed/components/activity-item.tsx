import { cn } from "@/lib/utils";
import { Star, GitPullRequest, CircleDot, GitCommitHorizontal, GitFork } from "lucide-react";

export interface ActivityEvent {
  type: string;
  actor: string;
  actorAvatar: string;
  repo: string;
  occurredAt: string;
  action?: string;
  description?: string;
  meta?: {
    branch?: string;
    commitHash?: string;
    additions?: number;
    deletions?: number;
    prNumber?: number;
    issueNumber?: number;
    tags?: string[];
  };
}

const eventConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  star:         { icon: Star,                className: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950", label: "starred the repository"  },
  pull_request: { icon: GitPullRequest,      className: "text-purple-500 bg-purple-50 dark:bg-purple-950", label: "opened a pull request"   },
  issues:       { icon: CircleDot,           className: "text-green-500 bg-green-50 dark:bg-green-950",    label: "opened an issue"         },
  push:         { icon: GitCommitHorizontal, className: "text-blue-500 bg-blue-50 dark:bg-blue-950",       label: "pushed commits"          },
  fork:         { icon: GitFork,             className: "text-orange-500 bg-orange-50 dark:bg-orange-950", label: "forked the repository"   },
};

const fallbackConfig = { icon: CircleDot, className: "text-muted-foreground bg-muted", label: "triggered an event" };

const getRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

interface Props {
  event: ActivityEvent;
}

export const ActivityItem = ({ event }: Props) => {
  const config = eventConfig[event.type] ?? fallbackConfig;
  const Icon = config.icon;
  const date = new Date(event.occurredAt);

  return (
    <div className="flex items-start gap-4 px-4 py-3.5 hover:bg-muted transition-colors">

      {/* Icon */}
      <div className={cn("p-2 rounded-full shrink-0 mt-0.5", config.className)}>
        <Icon className="size-3.5" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">

        {/* Actor + label + timestamp */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm leading-snug">
            <span className="font-semibold text-foreground">{event.actor}</span>
            <span className="text-muted-foreground"> in </span>
            <span className="font-medium text-primary">{event.repo}</span>
          </p>
          <span className="text-xs text-muted-foreground shrink-0">{getRelativeTime(date)}</span>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-muted-foreground truncate">{event.description}</p>
        )}

        {/* Meta */}
        {event.meta && (
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">

            {event.meta.branch && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GitCommitHorizontal className="size-3" />
                <span className="font-mono">{event.meta.branch}</span>
              </div>
            )}

            {event.meta.commitHash && (
              <span className="font-mono text-xs text-muted-foreground">{event.meta.commitHash.slice(0, 7)}</span>
            )}

            {(event.meta.additions !== undefined || event.meta.deletions !== undefined) && (
              <span className="text-xs">
                {event.meta.additions !== undefined && (
                  <span className="text-green-600">+{event.meta.additions}</span>
                )}
                {event.meta.additions !== undefined && event.meta.deletions !== undefined && (
                  <span className="text-muted-foreground"> </span>
                )}
                {event.meta.deletions !== undefined && (
                  <span className="text-red-500">-{event.meta.deletions}</span>
                )}
              </span>
            )}

            {event.meta.prNumber && (
              <span className="text-xs text-primary font-medium">#{event.meta.prNumber}</span>
            )}

            {event.meta.issueNumber && (
              <span className="text-xs text-primary font-medium">#{event.meta.issueNumber}</span>
            )}

            {event.meta.tags?.map(tag => (
              <span key={tag} className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">{tag}</span>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};
