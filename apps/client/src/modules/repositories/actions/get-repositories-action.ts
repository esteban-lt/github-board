import type { Repository } from '@/interfaces/repository';
import repositoryApi from '../api/repository-api';

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

export const getRepositoriesAction = async (params?: GetRepositoriesParams): Promise<PaginatedRepositoriesResponse> => {
  try {
    const response = await repositoryApi.getAll(params);
    return response.data;
  } catch(error) {
    throw new Error('Error getting repositories');
  }
}
