import apiService from '@/services/api-service';

const activityFeedApi = {

  getEvents: (repositoryId?: string) => {
    return apiService.get('/api/events', { params: { repositoryId } });
  },
};

export default activityFeedApi;
