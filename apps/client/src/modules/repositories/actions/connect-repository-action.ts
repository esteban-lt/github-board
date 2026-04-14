import repositoryApi from '../api/repository-api';

export const connectRepositoryAction = async (githubRepoId: number) => {
  try {
    const response = await repositoryApi.connect(githubRepoId);
    return response.data;
  } catch(error) {
    throw new Error('Error connecting repository');
  }
}
