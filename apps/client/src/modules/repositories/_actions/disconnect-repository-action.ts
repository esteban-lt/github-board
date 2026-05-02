import { handleApiError } from "@/lib/handle-api-error";
import repositoryApi from "../_api/repository-api";

export const disconnectRepositoryAction = async (id: string) => {
  try {
    const response = await repositoryApi.disconnect(id);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
