import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { getGithubRepositoriesAction } from "../actions/get-github-repositories-action";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/app-pages/header";
import { GitHubRepositoryGrid } from "../components/github-repository-grid";

const ConnectRepositoryPage = () => {

  const navigate = useNavigate();
  
  const { data: githubRepositories } = useQuery({
    queryKey: ['github-repositories'],
    queryFn: getGithubRepositoriesAction,
    staleTime: 1000 * 60 * 2,
  });

  console.log(githubRepositories);

  return (
    <>
      <Header 
        title="Connect repository"
        description="Add a GitHub repository to start monitoring its activity"
        actions={
          <Button variant='outline' onClick={() => navigate('/repositories')}><ArrowLeft />Back</Button>
        }
      />

      <GitHubRepositoryGrid 
        githubRepositories={githubRepositories}
      />
    </>
  );
}

export default ConnectRepositoryPage;
