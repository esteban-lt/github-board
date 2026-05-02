import type { ActivityEvent } from '../components/activity-item';
import activityFeedApi from '../api/activity-feed-api';
import { handleApiError } from '@/lib/handle-api-error';

export const getEventsAction = async (repositoryId?: string): Promise<ActivityEvent[] | undefined> => {
  try {
    const response = await activityFeedApi.getEvents(repositoryId);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
};
