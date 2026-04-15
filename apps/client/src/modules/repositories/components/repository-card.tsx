import type { Repository } from "../../../interfaces/repository";
import { CircleDot, GitFork, GitPullRequest, RefreshCw, Star, Unplug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  repository: Repository;
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
}

export const RepositoryCard = ({ repository, onDisconnect, onSynchronize }: Props) => {

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="bg-primary/5 border p-2 rounded-lg">
            <img src="/avatar.png" alt="" className="size-6" />
          </span>
          <div>
            <CardTitle className="flex items-center gap-1.5">
              {repository.name}
              <Badge variant="outline">{repository.isPrivate ? 'Private' : 'Public'}</Badge>
            </CardTitle>
            <CardDescription>{repository.fullName}</CardDescription>
          </div>
        </div>

        <Badge variant="outline">
          <span className={`inline-flex size-2 rounded-full ${repository.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          {repository.isActive ? 'active' : 'inactive'}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {(repository.description ? repository.description : <i>No description</i>)}
        </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <GitHubStat icon={<Star className="text-yellow-500 size-3.5" />} value={repository.stars} />
          <GitHubStat icon={<GitFork className="text-blue-500 size-3.5" />} value={repository.forks} />
          <GitHubStat icon={<CircleDot className="text-purple-500 size-3.5" />} value={repository.openIssues} />
          <GitHubStat icon={<GitPullRequest className="text-green-500 size-3.5" />} value={repository.openPullRequests} />
          <Badge variant="outline">{repository.language}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Last synced {new Date(repository.lastSyncedAt).toLocaleString()}
        </p>
      </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex-1">View details</Button>
          <div className="flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-r-none border-r-0"
                  onClick={() => onSynchronize(repository.id)}
                >
                  <RefreshCw className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Synchronize</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-none" 
                  onClick={() => onDisconnect(repository.id)}
                >
                  <Unplug className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Disconnect</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface GitHubStat {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const GitHubStat = ({ icon, value }: { icon: React.ReactNode; value: number }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-sm font-medium">{value}</span>
  </div>
);
