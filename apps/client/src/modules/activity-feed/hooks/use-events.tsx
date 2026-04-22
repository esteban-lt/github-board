import { useQuery } from '@tanstack/react-query';
import { getEventsAction } from '../actions/get-events-actions';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEventsAction,
    staleTime: 1000 * 60 * 2,
  });
};
