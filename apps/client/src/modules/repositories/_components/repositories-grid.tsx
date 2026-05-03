import type { Repository } from "../../../interfaces/repository";
import { RepositoryCard } from "./repository-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  repositories: Repository[];
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
  onView: (fullName: string) => void;
}

export const RepositoriesGrid = ({ repositories, isLoading = false, onConnect, onDisconnect, onSynchronize, onView }: Props) => {

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col justify-between gap-4 p-4 h-45">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Skeleton className="size-8 rounded-md shrink-0" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <Skeleton className="h-5 w-14 rounded-full shrink-0" />
            </div>

            <Skeleton className="h-3 w-3/4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-12 rounded-full" />
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-3 w-6" />
              </div>
              <Skeleton className="h-3 w-28" />
            </div>

            <div className="flex items-center">
              <Skeleton className="h-8 flex-1 rounded-r-none" />
              <Skeleton className="size-8 rounded-none" />
              <Skeleton className="size-8 rounded-l-none" />
            </div>
          </Card>
        ))}

      {!isLoading &&
        repositories?.map((repository) => (
          <RepositoryCard
            key={repository.fullName}
            repository={repository}
            onDisconnect={onDisconnect}
            onSynchronize={onSynchronize}
            onView={() => onView(repository.fullName)}
          />
        ))
      }

      {!isLoading && (
        <Card className="flex flex-col items-center justify-center gap-3 p-6 min-h-45">
          <div className="border p-3 rounded-xl">
            <GitBranch className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Connect a Repository</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a GitHub repository to start monitoring its activity.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onConnect}>
            <Plus className="size-3.5" />
            Connect Repository
          </Button>
        </Card>
      )}
    </div>
  );
};
