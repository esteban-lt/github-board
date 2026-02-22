import { repositoryApi } from '../api/repository.api';

export const getRepositoriesAction = async () => {
  const { data } = await repositoryApi.getAll();
  return data;
}
