import apiService from '@/services/api-service';

interface GetRepositoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  sort?: string;
  order?: string;
}

interface GetGithubRepositoriesParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: string;
  search?: string;
}

const repositoryApi = {

  getAll: (params?: GetRepositoriesParams) => {
    return apiService.get('/api/repositories', { params });
  },
  getByid: (id: string) => {
    return apiService.get(`/api/repositories/${id}`);
  },
  getGithubRepositories: (params?: GetGithubRepositoriesParams) => {
    return apiService.get('/api/github/repositories', { params });
  },
  getByFullName: (owner: string, repo: string) => {
    return apiService.get(`api/repositories/${owner}/${repo}`);
  },
  getContributors: (owner: string, repo: string) => {
    return apiService.get(`api/repositories/${owner}/${repo}/contributors`);
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
