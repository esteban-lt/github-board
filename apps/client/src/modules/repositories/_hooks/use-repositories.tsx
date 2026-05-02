import { useQuery } from "@tanstack/react-query";
import { getRepositoriesAction } from "../_actions/get-repositories-action";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseRepositoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  sort?: string;
  order?: string;
}

export const useRepositories = (params: UseRepositoriesParams = {}) => {
  const query = useQuery({
    queryKey: ['repositories', params],
    queryFn: () => getRepositoriesAction(params),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if(query.error) toast.error(query.error.message, { position: 'top-right' });
  }, [query.error]);

  return query;
}
