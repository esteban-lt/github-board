import { Octokit } from 'octokit';

const octokitClient = (accessToken: string) => {
  return new Octokit({
    auth: accessToken,
  });
}

export default octokitClient;
