import type { Repository } from '../entities/repository';

export interface PaginatedRepositories {
  data: Repository[];
  total: number;
  page: number;
  totalPages: number;
}
