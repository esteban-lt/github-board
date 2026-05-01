import { useQuery } from "@tanstack/react-query";
import { getGithubRepositoriesAction } from "../_actions/get-github-repositories-action";

interface UseGithubRepositoriesParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: string;
  search?: string;
}

export const useGithubRepositories = (params: UseGithubRepositoriesParams = {}) => {
  return useQuery({
    queryKey: ['github-repositories', params],
    queryFn: () => getGithubRepositoriesAction(params),
    staleTime: 1000 * 60 * 3,
  });
}
