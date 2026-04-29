import type { ActivityEvent } from "../components/activity-item";

const API_URL = import.meta.env.VITE_API_URL;
const EVENT_TYPES = ['star', 'push', 'pull_request', 'issues', 'fork'];

export const streamEventsAction = (onEvent: (event: ActivityEvent) => void) => {
  const eventSource = new EventSource(`${API_URL}/api/events/stream`, {
    withCredentials: true,
  });

  EVENT_TYPES.forEach(type =>
    eventSource.addEventListener(type, (e: MessageEvent) => {
      onEvent(JSON.parse(e.data));
    })
  );

  eventSource.onerror = () => eventSource.close();

  return () => eventSource.close();
};
