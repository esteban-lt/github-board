import { handleApiError } from "@/lib/handle-api-error";
import repositoryApi from "../_api/repository-api";

export const synchronizeRepositoryAction = async (id: string) => {
  try {
    const response = await repositoryApi.synchronize(id);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
