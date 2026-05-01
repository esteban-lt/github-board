import type { ActivityEvent } from '../components/activity-item';
import activityFeedApi from '../api/activity-feed-api';

export const getEventsAction = async (repositoryId?: string): Promise<ActivityEvent[]> => {
  try {
    const response = await activityFeedApi.getEvents(repositoryId);
    return response.data;
  } catch(error) {
    throw new Error('Failed to fetch events');
  }
};
