import type { Repository } from '@/interfaces/repository';
import repositoryApi from '../_api/repository-api';
import { handleApiError } from '@/lib/handle-api-error';

interface GetRepositoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  sort?: string;
  order?: string;
}

export interface PaginatedRepositoriesResponse {
  data: Repository[];
  total: number;
  page: number;
  totalPages: number;
}

export const getRepositoriesAction = async (params?: GetRepositoriesParams) => {
  try {
    const response = await repositoryApi.getAll(params);
    return response.data;
  } catch(error) {
    handleApiError(error);
  }
}
