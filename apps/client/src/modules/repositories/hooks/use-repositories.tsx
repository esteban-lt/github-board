import { useQuery } from "@tanstack/react-query";
import { getRepositoriesAction } from "../actions/get-repositories-action";

interface UseRepositoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  sort?: string;
  order?: string;
}

export const useRepositories = (params: UseRepositoriesParams = {}) => {
  return useQuery({
    queryKey: ['repositories', params],
    queryFn: () => getRepositoriesAction(params),
    staleTime: 1000 * 60 * 5,
  });
}
