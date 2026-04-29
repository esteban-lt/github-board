import { GitFork } from "lucide-react";
import type { GitHubRepository } from "@/interfaces/github-repository";
import type { Repository } from "@/interfaces/repository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { GitHubRepositoryCard } from "./github-repository-card";
import { RepositorySearch } from "./filters/repository-search";
import { Skeleton } from "@/components/ui/skeleton";

export type GitHubSort = "updated" | "created" | "pushed" | "full_name-asc" | "full_name-desc";

export const GITHUB_SORT_TO_API: Record<GitHubSort, { sort: 'updated' | 'created' | 'pushed' | 'full_name'; direction: 'asc' | 'desc' }> = {
  updated: { sort: 'updated', direction: 'desc' },
  created: { sort: 'created', direction: 'desc' },
  pushed: { sort: 'pushed', direction: 'desc' },
  "full_name-asc": { sort: 'full_name', direction: 'asc' },
  "full_name-desc": { sort: 'full_name', direction: 'desc' },
};

const GITHUB_SORT_OPTIONS: { label: string; value: GitHubSort }[] = [
  { label: "Recently updated", value: "updated" },
  { label: "Recently created", value: "created" },
  { label: "Recently pushed", value: "pushed" },
  { label: "Name (A-Z)", value: "full_name-asc" },
  { label: "Name (Z-A)", value: "full_name-desc" },
];

interface Props {
  githubRepositories: GitHubRepository[] | undefined;
  connectedRepositories: Repository[];
  isLoading: boolean;
  connectingRepoId: number | null;
  onConnect: (githubRepoId: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: GitHubSort;
  onSortChange: (value: GitHubSort) => void;
}

export const GitHubRepositoryGrid = ({
  githubRepositories,
  connectedRepositories,
  isLoading,
  connectingRepoId,
  onConnect,
  search,
  onSearchChange,
  sort,
  onSortChange,
}: Props) => {
  const currentSort = GITHUB_SORT_OPTIONS.find((o) => o.value === sort);

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

        {/* Filters */}
        <div className="flex items-center gap-2">
          <RepositorySearch value={search} onChange={onSearchChange} placeholder="Filter repositories..." />
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground">
                  Sort: <span className="text-foreground font-medium">{currentSort?.label}</span>
                  <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup value={sort} onValueChange={(v) => onSortChange(v as GitHubSort)}>
                  {GITHUB_SORT_OPTIONS.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
            {githubRepositories?.map((githubRepository: GitHubRepository) => (
              <GitHubRepositoryCard
                key={githubRepository.id}
                githubRepository={githubRepository}
                isConnected={connectedRepositories.some((r) => r.githubRepoId === githubRepository.id)}
                isLoading={connectingRepoId === githubRepository.id}
                onConnect={onConnect}
              />
            ))}
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
