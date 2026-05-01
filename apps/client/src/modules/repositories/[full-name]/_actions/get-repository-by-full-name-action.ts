import repositoryApi from "../../_api/repository-api";

export const getRepositoryByFullNameAction = async (owner: string, repo: string) => {
  try {
    const response = await repositoryApi.getByFullName(owner, repo);
    return response.data;
  } catch(error) {
    throw new Error('Error getting repositoriy');
  }
}
