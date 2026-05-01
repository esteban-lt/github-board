import { useQuery } from "@tanstack/react-query";
import { getRepositoryContributorsAction } from "../_actions/get-repository-contributors-action";

interface Props {
  owner: string;
  repo: string;
}

export const useRepositoryContributors = ({ owner, repo }: Props) => {

  return useQuery({
    queryKey: ['repository-contributors', owner, repo],
    queryFn: () => getRepositoryContributorsAction(owner, repo),
    staleTime: 1000 * 60 * 3,
  });
}
