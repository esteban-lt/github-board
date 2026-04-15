import apiService from '@/services/api-service';

const repositoryApi = {

  getAll: () => {
    return apiService.get('/api/repositories');
  },
  getByid: (id: string) => {
    return apiService.get(`/api/repositories/${id}`);
  },
  getGithubRepositories: () => {
    return apiService.get('/api/github/repositories');
  },
  connect: (githubRepoId: number) => {
    return apiService.post('/api/repositories/connect', {
      githubRepoId,
    });
  },
  disconnect: (id: string) => {
    return apiService.patch(`/api/repositories/${id}/disconnect`);
  },
  toggleStatus: (id: string) => {
    return apiService.patch(`/api/repositories/${id}/status`);
  },
  synchronize: (id: string) => {
    return apiService.put(`api/repositories/${id}/synchronize`);
  },
}

export default repositoryApi;
