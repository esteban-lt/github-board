import type { Repository } from '../entities/repository';

export interface GetRepositoriesParams {
  page: number;
  limit: number;
  search?: string;
  language?: string;
  sort: 'stars' | 'forks' | 'updated_at' | 'name';
  order: 'asc' | 'desc';
}

export interface PaginatedRepositories {
  data: Repository[];
  total: number;
  page: number;
  totalPages: number;
}
