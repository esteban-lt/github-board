import apiService from '@/services/api-service';

const dashboardApi = {
  getStats: () => {
    return apiService.get('/api/dashboard/stats');
  },
  getTopRepositories: () => {
    return apiService.get('/api/dashboard/top-repositories');
  },
  getCommitActivity: () => {
    return apiService.get('/api/dashboard/commit-activity');
  },
  getPendingReviews: () => {
    return apiService.get('/api/dashboard/pending-reviews');
  }
};

export default dashboardApi;
