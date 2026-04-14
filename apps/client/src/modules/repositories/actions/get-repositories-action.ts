import repositoryApi from '../api/repository-api';

export const getRepositoriesAction = async () => {
  try {
    const response = await repositoryApi.getAll();
    return response.data;
  } catch(error) {
    throw new Error('Error getting repositories');
  }
}
