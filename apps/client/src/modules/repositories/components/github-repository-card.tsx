import { GitFork, Loader2, Star } from "lucide-react";
import type { GitHubRepository } from "@/interfaces/github-repository";
import { getLanguageColor } from "@/lib/get-language-color";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  githubRepository: GitHubRepository;
  isConnected: boolean;
  isLoading: boolean;
  onConnect: (githubRepoId: number) => void;
}

export const GitHubRepositoryCard = ({ githubRepository, isConnected, isLoading = false, onConnect }: Props) => {

  const languageColor = githubRepository.language 
    ? getLanguageColor(githubRepository.language) 
    : null;
  
  return (
    <Card className="flex flex-row items-center gap-3 px-4 py-3">
      <div className="bg-primary/5 border p-2 rounded-md shrink-0 self-start mt-0.5 sm:self-center">
        <img src={githubRepository.ownerAvatarUrl} alt="" className="size-6" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between min-w-0 flex-1 gap-1 sm:gap-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium truncate min-w-0">{githubRepository.fullName}</span>
            <Badge variant="outline" className="shrink-0">
              {githubRepository.isPrivate ? 'Private' : 'Public'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {githubRepository.description
              ? githubRepository.description
              : <i>No description provided</i>
            }
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
            <Star className="size-3.5" />
            {githubRepository.stars}
          </div>
          <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
            <GitFork className="size-3.5" />
            {githubRepository.forks}
          </div>
          {languageColor && (
            <Badge
              variant="outline"
              style={{ backgroundColor: languageColor.bg, color: languageColor.text, borderColor: 'transparent' }}
            >
              {githubRepository.language}
            </Badge>
          )}
        </div>
      </div>

      <Button 
        disabled={isConnected || isLoading} 
        variant="outline" 
        className="shrink-0 self-center"
        onClick={() => onConnect(githubRepository.id)}
      >
        {isLoading
          ? <><Loader2 className="size-4 animate-spin" /> Connecting...</>
          : isConnected ? 'Connected' : 'Connect'
        }
      </Button>
    </Card>
  );
}
