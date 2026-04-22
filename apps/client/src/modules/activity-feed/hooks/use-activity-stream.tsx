import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ActivityEvent } from '../components/activity-item';

const API_URL = import.meta.env.VITE_API_URL;
const EVENT_TYPES = ['star', 'push', 'pull_request', 'issues', 'fork'];

export const useActivityStream = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/events/stream`, {
      withCredentials: true,
    });

    const handleEvent = (e: MessageEvent) => {
      const newEvent = JSON.parse(e.data) as ActivityEvent;
      queryClient.setQueryData<ActivityEvent[]>(['events'], (prev) => {
        if (!prev) return [newEvent];
        return [newEvent, ...prev];
      });
    };

    EVENT_TYPES.forEach(type => eventSource.addEventListener(type, handleEvent));
    eventSource.onerror = () => eventSource.close();

    return () => eventSource.close();
  }, [queryClient]);
};
