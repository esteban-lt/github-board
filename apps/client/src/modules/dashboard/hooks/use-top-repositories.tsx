import { useQuery } from '@tanstack/react-query';
import { getTopRepositoriesAction } from '../actions/get-top-repositories-action';

export const useTopRepositories = () => {
  return useQuery({
    queryKey: ['dashboard', 'top-repositories'],
    queryFn: getTopRepositoriesAction,
    staleTime: 1000 * 60 * 3,
  });
}
