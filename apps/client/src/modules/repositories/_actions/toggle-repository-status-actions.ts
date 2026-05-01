import repositoryApi from '../_api/repository-api';

export const toggleRepositoryStatusAction = async (id: string) => {
  try {
    const response = await repositoryApi.toggleStatus(id);
    return response.data;
  } catch(error) {
    throw new Error('Error changing repository status');
  }
}
