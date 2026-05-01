import repositoryApi from '../_api/repository-api';

export const getRepositoryByIdAction = async (id: string) => {
  try {
    const response = await repositoryApi.getByid(id);
    return response.data;
  } catch(error) {
    throw new Error('Error getting repository');
  }
}
