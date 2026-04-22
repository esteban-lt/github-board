import apiService from '@/services/api-service';

const activityFeedApi = {

  getEvents: () => {
    return apiService.get('/api/events')
  },
};

export default activityFeedApi;
