import apiService from '@/services/api-service';

const repositoriesApi = {
  getGithubRepositories: () => {
    return apiService.get('/api/github/repositories');
  }
};

export default repositoriesApi;
