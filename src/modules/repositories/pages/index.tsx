import { Header } from "@/components/app-pages/header";
import { Actions } from "../components/actions";
import { RepositoryCard } from "../components/repository-card";
import { repositoriesMock } from "../mocks/repositories.mock";
import { RepositoryFilters } from "../components/repository-filters";

const Index = () => {
  return (
    <>
      <Header 
        title="Repositories"
        description="Manage and monitor your connected GitHub repositories"
        actions={<Actions />}
      />

      <RepositoryFilters />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {
          repositoriesMock.map(repository => (
            <RepositoryCard key={repository.fullName} repository={repository} />
          ))
        }
      </div>
    </>
  );
}

export default Index;
