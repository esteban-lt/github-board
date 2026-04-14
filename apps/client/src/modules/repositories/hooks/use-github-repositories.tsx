import { useQuery } from "@tanstack/react-query"
import { getGithubRepositoriesAction } from "../actions/get-github-repositories-action";

export const useGithubRepositories = () => {

  return useQuery({
    queryKey: ['github-repositories'],
    queryFn: getGithubRepositoriesAction,
    staleTime: 1000 * 60 * 3,
  });
}
