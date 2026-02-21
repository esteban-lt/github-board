import { Header } from "@/components/app-pages/header";
import { Actions } from "../components/actions";
import { RepositoryFilters } from "../components/repository-filters";
import { RepositoryList } from "../components/repository-list";
import { repositoriesMock } from "../mocks/repositories.mock";

const Index = () => {
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
