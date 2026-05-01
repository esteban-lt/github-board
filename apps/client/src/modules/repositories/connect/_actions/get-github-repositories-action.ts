import type { GitHubRepository } from '@/interfaces/github-repository';
import repositoriesApi from '../../_api/repository-api';

interface GetGithubRepositoriesParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: string;
  search?: string;
}

export interface PaginatedGithubRepositoriesResponse {
  data: GitHubRepository[];
  total_count: number;
  page: number;
  hasNextPage: boolean;
}

export const getGithubRepositoriesAction = async (params?: GetGithubRepositoriesParams): Promise<PaginatedGithubRepositoriesResponse> => {
  try {
    const response = await repositoriesApi.getGithubRepositories(params);
    const { ok, ...pagination } = response.data;
    return pagination as PaginatedGithubRepositoriesResponse;
  }
  catch(error) {
    throw new Error('Error fetching GitHub repositories');
  }
}
