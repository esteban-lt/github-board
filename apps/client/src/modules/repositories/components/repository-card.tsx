import type { Repository } from "../../../interfaces/repository";
import { CircleDot, GitFork, GitPullRequest, RefreshCw, Star, Unplug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatLastSynced } from "../lib/format-last-synced";
import { LanguageBadge } from "./ui/language-badge";
import { StatusBadge } from "./ui/status-badge";
import { RepositoryAvatar } from "./ui/repository-avatar";

interface Props {
  repository: Repository;
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
}

export const RepositoryCard = ({ repository, onDisconnect, onSynchronize }: Props) => {
  return (
    <Card className="flex flex-col p-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <RepositoryAvatar avatarUrl="/avatar.png" name={repository.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-sm truncate">{repository.name}</span>
              <Badge variant="outline" className="text-xs shrink-0 px-1.5 py-0">
                {repository.isPrivate ? "Private" : "Public"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{repository.fullName}</p>
          </div>
        </div>

        <StatusBadge status={repository.isActive} />
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground line-clamp-1">
        {repository.description ? repository.description : <i>No description</i>}
      </p>

      {/* Stats row */}
      <div className="flex items-center justify-between gap-x-4 gap-y-1 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {repository.language && (
            <LanguageBadge language={repository.language} />
          )}
          <GitHubStat icon={<Star className="size-3 text-muted-foreground" />} value={repository.stars} />
          <GitHubStat icon={<GitFork className="size-3 text-muted-foreground" />} value={repository.forks} />
          <GitHubStat icon={<CircleDot className="size-3 text-muted-foreground" />} value={repository.openIssues} />
          <GitHubStat icon={<GitPullRequest className="size-3 text-muted-foreground" />} value={repository.openPullRequests} />
        </div>
        <span className="text-xs text-muted-foreground">Last synced {formatLastSynced(repository.lastSyncedAt)}</span>
      </div>

      {/* Sparkline */}

      {/* Actions */}
      <div className="flex items-center">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs rounded-r-none border-r-0">
          View details
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-none border-r-0"
              onClick={() => onSynchronize(repository.id)}
            >
              <RefreshCw className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Synchronize</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-l-none"
              onClick={() => onDisconnect(repository.id)}
            >
              <Unplug className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Disconnect</TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

const GitHubStat = ({ icon, value }: { icon: React.ReactNode; value: number }) => (
  <div className="flex items-center gap-1">
    {icon}
    <span className="text-xs font-medium">{value}</span>
  </div>
);
