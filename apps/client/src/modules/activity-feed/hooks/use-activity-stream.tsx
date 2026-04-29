import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ActivityEvent } from '../components/activity-item';
import { streamEventsAction } from '../actions/stream-events-action';

export const useActivityStream = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return streamEventsAction((newEvent) => {
      queryClient.setQueryData<ActivityEvent[]>(['events'], (prev) => {
        if (!prev) return [newEvent];
        return [newEvent, ...prev];
      });
    });
  }, [queryClient]);
};
