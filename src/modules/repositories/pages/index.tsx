import { useQuery } from "@tanstack/react-query";
import { getRepositoriesAction } from "../actions/repository.action";
import { repositoriesMock } from "../mocks/repositories.mock";
import { Header } from "@/components/app-pages/header";
import { Actions } from "../components/actions";
import { RepositoryFilters } from "../components/repository-filters";
import { RepositoryList } from "../components/repository-list";

const Index = () => {

  const { data: repositories } = useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositoriesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  console.log(repositories);

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
