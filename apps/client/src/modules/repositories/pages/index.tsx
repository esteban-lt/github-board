import { useNavigate } from "react-router";
import { Header } from "@/components/app-pages/header";
import { RepositoriesGrid } from "../components/repositories-grid";
import { Button } from "@/components/ui/button";
import { useRepositories } from "../hooks/use-repositories";
import { useDisconnectRepository } from "../hooks/use-disconnect-repository";
import { useSynchronizeRepository } from "../hooks/use-synchronize-repository";

const Index = () => {

  const navigate = useNavigate();
  const { data: repositories, isLoading } = useRepositories();
  const { mutate: disconnectRepository } = useDisconnectRepository();
  const { mutate: synchronizeRepository } = useSynchronizeRepository();

  return (
    <>
      <Header 
        title="Repositories"
        description="Manage your connected GitHub repositories"
        actions={
          <>
            <Button onClick={() => navigate('connect')}>Connect repository</Button>
          </>
        }
      />

      <RepositoriesGrid 
        repositories={repositories}
        isLoading={isLoading}
        onDisconnect={disconnectRepository}
        onSynchronize={synchronizeRepository}
      />
    </>
  );
}

export default Index;
