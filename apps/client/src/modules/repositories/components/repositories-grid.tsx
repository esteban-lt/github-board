import type { Repository } from "../../../interfaces/repository";
import { RepositoryCard } from "./repository-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface Props {
  repositories: Repository[];
  isLoading: boolean;
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
}

export const RepositoriesGrid = ({ repositories, isLoading = false, onDisconnect, onSynchronize }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-8 rounded-md shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
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
          />
        ))}

      {!isLoading && (
        <Card className="flex flex-col items-center justify-center gap-3 p-6 min-h-[180px]">
          <div className="border p-3 rounded-xl">
            <GitBranch className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Connect a Repository</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a GitHub repository to start monitoring its activity.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/repositories/connect")}>
            <Plus className="size-3.5" />
            Connect Repository
          </Button>
        </Card>
      )}
    </div>
  );
};
