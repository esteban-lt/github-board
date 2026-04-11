import { useNavigate } from "react-router";
import { Header } from "@/components/app-pages/header";
import { RepositoriesGrid } from "../components/repositories-grid";
import { Button } from "@/components/ui/button";
import { repositoriesMock } from "../mocks/repositories-mock";

const RepositoriesPage = () => {

  const navigate = useNavigate();

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

      <RepositoriesGrid repositories={repositoriesMock} />
    </>
  );
}

export default RepositoriesPage;
