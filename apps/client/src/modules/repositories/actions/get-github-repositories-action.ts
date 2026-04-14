import repositoriesApi from '../api/repository-api';

export const getGithubRepositoriesAction = async () => {
  try {
    const response = await repositoriesApi.getGithubRepositories();
    return response.data.data;
  }
  catch(error) {
    throw new Error('Error fetching GitHub repositories');
  }
}
