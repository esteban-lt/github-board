import type { Repository } from "../interfaces/repository";
import { CircleDot, GitFork, GitPullRequest, Lock, Star, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  repository: Repository;
}

export const RepositoryCard = ({ repository }: Props) => {

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-blue-50 border p-2 rounded-lg">
            {
              (repository.isPrivate)
              ? <Lock className="text-blue-700" />
              : <Unlock className="text-blue-700" />
            }
          </span>
          <div>
            <CardTitle>{repository.name}</CardTitle>
            <CardDescription>{repository.fullName}</CardDescription>
          </div>
        </div>

        <div>
          {
            (repository.isActive)
            ? (
              <Badge variant="outline">
                <span className="inline-flex size-2 rounded-full bg-green-500" /> 
                active
              </Badge>
            )
            : (
              <Badge variant="outline">
                <span className="inline-flex size-2 rounded-full bg-red-500" /> 
                inactive
              </Badge>
            )
          }
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="text-sm text-gray-700">{repository.description}</div>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <GitHubStat icon={<Star className="text-yellow-500 size-4" />} value={repository.stars} label="stars" />
          <GitHubStat icon={<GitFork className="text-blue-500 size-4" />} value={repository.forks} label="forks" />
          <GitHubStat icon={<CircleDot className="text-purple-500 size-4" />} value={repository.issues} label="issues" />
          <GitHubStat icon={<GitPullRequest className="text-green-500 size-4" />} value={repository.pullRequests} label="PRs" />
        </div>

        <div>
          <Badge variant="outline">{repository.languaje}</Badge>
        </div>

        <div>
          <Button variant="outline" className="w-full">
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const GitHubStat = ({
  icon,
  value,
  label,
  className,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  className?: string;
}) => {

  return (
    <div className="flex items-center gap-2">
      <span className={`${className}`}>{icon}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-semibold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
