import { handleApiError } from '@/lib/handle-api-error';
import repositoryApi from '../_api/repository-api';

export const toggleRepositoryStatusAction = async (id: string) => {
  try {
    const response = await repositoryApi.toggleStatus(id);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
