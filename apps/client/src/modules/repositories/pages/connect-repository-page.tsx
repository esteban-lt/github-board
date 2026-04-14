import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/app-pages/header";
import { GitHubRepositoryGrid } from "../components/github-repository-grid";
import { useGithubRepositories } from "../hooks/use-github-repositories";
import { useRepositories } from "../hooks/use-repositories";
import { useConnectRepository } from "../hooks/use-connect-repository";

const ConnectRepositoryPage = () => {

  const navigate = useNavigate();

  const { data: githubRepositories, isLoading } = useGithubRepositories();
  const { data: connectedRepositories } = useRepositories();
  const { mutate: connectRepository, isPending, variables } = useConnectRepository();
  console.log(githubRepositories);
  console.log(connectedRepositories);

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
        connectedRepositories={connectedRepositories}
        isLoading={isLoading}
        connectingRepoId={isPending ? variables : null}
        onConnect={connectRepository}
      />
    </>
  );
}

export default ConnectRepositoryPage;
