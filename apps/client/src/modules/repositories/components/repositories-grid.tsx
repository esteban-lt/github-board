import type { Repository } from "../../../interfaces/repository";
import { RepositoryCard } from "./repository-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {isLoading && Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-48" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Skeleton className="h-3.5 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-3.5 w-8" />
                <Skeleton className="h-3.5 w-8" />
                <Skeleton className="h-3.5 w-8" />
                <Skeleton className="h-3.5 w-8" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </CardContent>
        </Card>
      ))}

      {!isLoading && repositories && repositories.map(repository => (
        <RepositoryCard 
          key={repository.fullName} 
          repository={repository}
          onDisconnect={onDisconnect}
          onSynchronize={onSynchronize} 
        />
      ))}
      
      {!isLoading && (
        <Card className="flex flex-col items-center justify-center h-full">
          <div className="border p-4 rounded-xl">
            <GitBranch className="size-6" />
          </div>
          <div className="text-center">
            <p className="font-medium">Connect a Repository</p>
            <p className="text-sm text-muted-foreground">Add a GitHub repository to start monitoring its activity.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/repositories/connect')}>
            <Plus className="size-4" />
            Connect Repository
          </Button>
        </Card>
      )}
    </div>
  );
}
