import { handleApiError } from "@/lib/handle-api-error";
import repositoryApi from "../../_api/repository-api";

export const getRepositoryContributorsAction = async (owner: string, repo: string) => {
  try {
    const response = await repositoryApi.getContributors(owner, repo);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
