import { handleApiError } from '@/lib/handle-api-error';
import repositoryApi from '../_api/repository-api';

export const getRepositoryByIdAction = async (id: string) => {
  try {
    const response = await repositoryApi.getByid(id);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
