import dashboardApi from '../api/dashboard-api';

export const getTopRepositoriesAction = async () => {
  try {
    const response = await dashboardApi.getTopRepositories();
    return response.data;
  } catch(error) {
    throw new Error('Error getting top repositories');
  }
}
