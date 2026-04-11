import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubRepository } from "@/interfaces/github-repository";
import { GitHubRepositoryCard } from "./github-repository-card";

interface Props {
  githubRepositories: GitHubRepository[];
}

export const GitHubRepositoryGrid = ({ githubRepositories }: Props) => {

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
        <div className="space-y-2">
          {
            githubRepositories?.map((githubRepository: GitHubRepository) => (
              <GitHubRepositoryCard
                key={githubRepository.id}
                githubRepository={githubRepository}
              />
            ))
          }
        </div>

        {githubRepositories?.length === 0 && (
          <div className="py-8 text-center">
            <p className="mt-2 text-muted-foreground">No repositories found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
