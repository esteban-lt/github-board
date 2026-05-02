import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getGithubRepositoriesAction } from '../_actions/get-github-repositories-action';

interface UseGithubRepositoriesParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: string;
  search?: string;
}

export const useGithubRepositories = (params: UseGithubRepositoriesParams = {}) => {
  const query = useQuery({
    queryKey: ['github-repositories', params],
    queryFn: () => getGithubRepositoriesAction(params),
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (query.error) toast.error(query.error.message, { position: 'top-right' });
  }, [query.error]);

  return query;
};
