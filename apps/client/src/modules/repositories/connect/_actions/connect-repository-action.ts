import { handleApiError } from '@/lib/handle-api-error';
import repositoryApi from '../../_api/repository-api';

export const connectRepositoryAction = async (githubRepoId: number) => {
  try {
    const response = await repositoryApi.connect(githubRepoId);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
