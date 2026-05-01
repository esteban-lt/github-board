import { useQuery } from '@tanstack/react-query';
import { getEventsAction } from '../actions/get-events-actions';

export const useEvents = (repositoryId?: string) => {
  return useQuery({
    queryKey: ['events', repositoryId],
    queryFn: () => getEventsAction(repositoryId),
    staleTime: 1000 * 60 * 2,
  });
};
