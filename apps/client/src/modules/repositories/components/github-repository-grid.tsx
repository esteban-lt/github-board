import type { GitHubRepository } from "@/interfaces/github-repository";
import type { Repository } from "@/interfaces/repository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubRepositoryCard } from "./github-repository-card";
import { Skeleton } from "@/components/ui/skeleton";
import { GitFork } from "lucide-react";

interface Props {
  githubRepositories: GitHubRepository[];
  connectedRepositories: Repository[];
  isLoading: boolean;
  connectingRepoId: number | null;
  onConnect: (githubRepoId: number) => void;
}

export const GitHubRepositoryGrid = ({ githubRepositories, connectedRepositories, isLoading, connectingRepoId, onConnect }: Props) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Select a Repository
        </CardTitle>
        <CardDescription>
          Choose from your available GitHub repositories.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Repository List */}
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-row items-center gap-3 px-4 py-3">
                <Skeleton className="size-10 rounded-md shrink-0" />
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-3.5 w-72 max-w-full" />
                </div>
                <Skeleton className="h-9 w-24 rounded-md shrink-0" />
              </Card>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="space-y-2">
            {
              githubRepositories?.map((githubRepository: GitHubRepository) => (
                <GitHubRepositoryCard
                  key={githubRepository.id}
                  githubRepository={githubRepository}
                  isConnected={connectedRepositories.some((connectedRepository) => connectedRepository.githubRepoId === githubRepository.id)}
                  isLoading={connectingRepoId === githubRepository.id}
                  onConnect={onConnect}
                />
              ))
            }
          </div>
        )}

        {!isLoading && githubRepositories && githubRepositories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
            <div className="border p-4 rounded-xl">
              <GitFork className="size-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">No repositories found</p>
              <p className="text-sm text-muted-foreground">We couldn't find any GitHub repositories linked to your account.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
