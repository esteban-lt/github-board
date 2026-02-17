import { Badge } from "@/components/ui/badge";
import { Check, GitFork, Lock, Star, Unlock } from "lucide-react";

export interface GitHubRepository {
  id: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  isPrivate: boolean;
}

interface Props {
  repository: GitHubRepository;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const GitHubRepositoryItem = ({ repository, isSelected, onSelect }: Props) => {
  return (
    <div
      onClick={() => onSelect(repository.id)}
      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
        isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            isSelected ? "bg-primary/20" : "bg-muted"
          }`}
        >
          {repository.isPrivate ? (
            <Lock className="h-5 w-5 text-primary" />
          ) : (
            <Unlock className="h-5 w-5 text-primary" />
          )}
        </div>

        <div className="min-w-0">
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
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          {repository.stars}
        </div>

        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          {repository.forks}
        </div>

        <Badge variant="outline">{repository.language}</Badge>

        {isSelected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
