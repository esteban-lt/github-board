import repositoryApi from "../api/repository-api";

export const disconnectRepositoryAction = async (id: string) => {
  try {
    const response = await repositoryApi.disconnect(id);
    return response.data;
  } catch(error) {
    throw new Error('Error disconnecting repository');
  }
}
