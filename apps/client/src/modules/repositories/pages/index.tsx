import { useNavigate } from "react-router";
import { Header } from "@/components/app-pages/header";
import { RepositoriesGrid } from "../components/repositories-grid";
import { Button } from "@/components/ui/button";
import { useRepositories } from "../hooks/use-repositories";
import { useDisconnectRepository } from "../hooks/use-disconnect-repository";
import { useSynchronizeRepository } from "../hooks/use-synchronize-repository";
import { RefreshCw } from "lucide-react";
import { RepositoryFilters } from "../components/repository-filters";
import { useRepositoryFilters } from "../hooks/use-repository-filters";
import { RepositoryTable } from "../components/repository-table";

const Index = () => {

  const navigate = useNavigate();
  
  const { data: repositories, isLoading } = useRepositories();
  const { mutate: disconnectRepository } = useDisconnectRepository();
  const { mutate: synchronizeRepository } = useSynchronizeRepository();

  const filters = useRepositoryFilters(repositories);

  return (
    <>
      <Header 
        title="Repositories"
        description="Manage your connected GitHub repositories"
        actions={
          <div className="flex gap-2">
            <Button variant="outline"><RefreshCw /> Resync all</Button>
            <Button onClick={() => navigate('connect')}>Connect repository</Button>
          </div>
        }
      />

      <RepositoryFilters
        repositories={repositories ?? []}
        search={filters.search}
        onSearchChange={filters.setSearch}
        status={filters.status}
        onStatusChange={filters.setStatus}
        language={filters.language}
        onLanguageChange={filters.setLanguage}
        sort={filters.sort}
        onSortChange={filters.setSort}
        view={filters.view}
        onViewChange={filters.setView}
      />

      {filters.view === "grid" ? (
        <RepositoriesGrid
          repositories={filters.filtered}
          isLoading={isLoading}
          onDisconnect={disconnectRepository}
          onSynchronize={synchronizeRepository}
        />
      ) : (
        <RepositoryTable
          repositories={filters.filtered}
          onDisconnect={disconnectRepository}
          onSynchronize={synchronizeRepository}
        />
      )}
    </>
  );
}

export default Index;
