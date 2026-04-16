import dashboardApi from '../api/dashboard-api';

export const getDashboardStatsAction = async () => {
  try {
    const response = await dashboardApi.getStats();
    return response.data;
  } catch(error) {
    throw new Error('Error getting stats');
  }
}
