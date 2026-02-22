import { apiService } from '@/services/api.service';

export const repositoryApi = {

  getAll: () => {
    return apiService.get('/api/repositories');
  }
}
