import { useQuery } from "@tanstack/react-query"
import { getRepositoriesAction } from "../actions/get-repositories-action";

export const useRepositories = () => {
  
  return useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositoriesAction,
    staleTime: 1000 * 60 * 5,
  });
}
