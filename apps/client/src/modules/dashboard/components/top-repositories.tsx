import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TopRepository } from "./top-repository";
import type { TopRepositoryItem } from "../interfaces/top-repository-item";

const SKELETON_COUNT = 5;

interface Props {
  repositories: TopRepositoryItem[];
  isLoading: boolean;
}

export const TopRepositories = ({ repositories, isLoading = false }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top repositories</CardTitle>
        <CardDescription>Most active repositories by stars and activity</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-md" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
                {i < SKELETON_COUNT - 1 && <Separator />}
              </div>
            ))
          : repositories.map((repository, index) => (
              <div key={repository.id}>
                <TopRepository {...repository} />
                {index < repositories.length - 1 && <Separator />}
              </div>
            ))
        }
      </CardContent>
    </Card>
  );
}
