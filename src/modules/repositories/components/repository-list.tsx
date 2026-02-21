import type { Repository } from "../interfaces/repository";
import { RepositoryCard } from "./repository-card";

interface Props {
  repositories: Repository[];
}

export const RepositoryList = ({ repositories }: Props) => {

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {
        repositories.map(repository => (
          <RepositoryCard key={repository.fullName} repository={repository} />
        ))
      }
    </div>
  );
}