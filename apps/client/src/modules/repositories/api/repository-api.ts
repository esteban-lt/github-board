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
  toggleStatus: (id: string) => {
    return apiService.patch(`/api/repositories/${id}/status`);
  },
}

export default repositoryApi;
