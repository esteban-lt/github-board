import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ActivityEvent } from '../components/activity-item';
import { streamEventsAction } from '../actions/stream-events-action';

export const useActivityStream = (repositoryId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return streamEventsAction((newEvent) => {
      if (repositoryId && newEvent.repositoryId !== repositoryId) return;
      queryClient.setQueryData<ActivityEvent[]>(['events', repositoryId], (prev) => {
        if (!prev) return [newEvent];
        return [newEvent, ...prev];
      });
    });
  }, [queryClient, repositoryId]);
};
