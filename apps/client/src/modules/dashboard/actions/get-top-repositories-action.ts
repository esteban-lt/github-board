import { handleApiError } from '@/lib/handle-api-error';
import dashboardApi from '../api/dashboard-api';

export const getTopRepositoriesAction = async () => {
  try {
    const response = await dashboardApi.getTopRepositories();
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
