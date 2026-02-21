import type { GitHubRepository } from "../interfaces/github-repository";
import { Badge } from "@/components/ui/badge";
import { Check, GitFork, Lock, Star, Unlock } from "lucide-react";

interface Props {
  repository: GitHubRepository;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const GitHubRepositoryCard = ({ repository, isSelected, onSelect }: Props) => {
  return (
    <div
      onClick={() => onSelect(repository.id)}
      className={`
        flex items-center justify-between p-4 rounded-md border transition-all hover:border-primary/25
        ${ isSelected ? "border-primary/50 hover:border-primary/50 bg-primary/5" : "border-border" }
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="bg-primary/5 border p-2 rounded-md">
          {repository.isPrivate ? (
            <Lock className="text-primary" />
          ) : (
            <Unlock className="text-primary" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium truncate">{repository.fullName}</span>

            {repository.isPrivate && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Private
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {repository.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
        <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
          <Star className="size-4 text-yellow-500" />
          {repository.stars}
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
          <GitFork className="size-4 text-blue-500" />
          {repository.forks}
        </div>

        <Badge variant="outline">{repository.language}</Badge>

        {isSelected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Check className="size-4 text-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
