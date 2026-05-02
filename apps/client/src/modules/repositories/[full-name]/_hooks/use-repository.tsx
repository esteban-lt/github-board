import { useQuery } from "@tanstack/react-query"
import { getRepositoryByFullNameAction } from "../_actions/get-repository-by-full-name-action"
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  owner: string;
  repo: string;
}

export const useRepository = ({ owner, repo }: Props) => {

  const query = useQuery({
    queryKey: ['repositories', owner, repo],
    queryFn: () => getRepositoryByFullNameAction(owner, repo),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if(query.error) toast.error(query.error.message, { position: 'top-right' });
  }, [query.error]);

  return query;
}
