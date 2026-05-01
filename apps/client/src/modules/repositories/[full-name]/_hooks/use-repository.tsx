import { useQuery } from "@tanstack/react-query"
import { getRepositoryByFullNameAction } from "../_actions/get-repository-by-full-name-action"

interface Props {
  owner: string;
  repo: string;
}

export const useRepository = ({ owner, repo }: Props) => {

  return useQuery({
    queryKey: ['repositories', owner, repo],
    queryFn: () => getRepositoryByFullNameAction(owner, repo),
    staleTime: 1000 * 60 * 5,
  });
}
