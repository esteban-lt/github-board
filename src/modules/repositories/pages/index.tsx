import { useEffect } from "react";
import { Header } from "@/components/app-pages/header";
import { Actions } from "../components/actions";
import { RepositoryFilters } from "../components/repository-filters";
import { RepositoryList } from "../components/repository-list";
import { repositoriesMock } from "../mocks/repositories.mock";
import { getRepositoriesAction } from "../actions/repository.action";

const Index = () => {

  useEffect(() => {
    getRepositoriesAction().then(repositories => console.log(repositories)).catch(console.log);
  }, []);

  return (
    <>
      <Header 
        title="Repositories"
        description="Manage and monitor your connected GitHub repositories"
        actions={<Actions />}
      />

      <RepositoryFilters />
      <RepositoryList repositories={repositoriesMock} />
    </>
  );
}

export default Index;
