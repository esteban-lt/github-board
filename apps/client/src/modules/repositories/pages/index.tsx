import { useNavigate } from "react-router";
import { RefreshCw } from "lucide-react";
import { Header } from "@/components/app-pages/header";
import { Button } from "@/components/ui/button";
import { RepositoriesGrid } from "../components/repositories-grid";
import { RepositoryFilters } from "../components/repository-filters";
import { RepositoryTable } from "../components/repository-table";
import { PaginationBar } from "../components/ui/pagination-bar";
import { useRepositories } from "../hooks/use-repositories";
import { useRepositoryFilters } from "../hooks/use-repository-filters";
import { useDisconnectRepository } from "../hooks/use-disconnect-repository";
import { useSynchronizeRepository } from "../hooks/use-synchronize-repository";
import type { Repository } from "@/interfaces/repository";

const Index = () => {

  const navigate = useNavigate();

  const { mutate: disconnectRepository } = useDisconnectRepository();
  const { mutate: synchronizeRepository } = useSynchronizeRepository();

  const filters = useRepositoryFilters();
  const { data, isLoading } = useRepositories(filters.apiParams);

  const repos: Repository[] = data?.data ?? [];
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

  let filtered = repos;
  if (filters.status === "active") filtered = repos.filter((r) => r.isActive);
  if (filters.status === "inactive") filtered = repos.filter((r) => !r.isActive);
  if (filters.status === "public") filtered = repos.filter((r) => !r.isPrivate);
  if (filters.status === "private") filtered = repos.filter((r) => r.isPrivate);

  const counts = { all: data?.total ?? 0 };

  const totalPages = data?.totalPages ?? 1;
  const currentPage = filters.page;

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
        languages={languages}
        counts={counts}
        search={filters.searchInput}
        onSearchChange={filters.setSearchInput}
        status={filters.status}
        onStatusChange={filters.setStatus}
        language={filters.language}
        onLanguageChange={filters.setLanguage}
        sort={filters.sort}
        onSortChange={filters.setSort}
        view={filters.view}
        onViewChange={filters.setView}
      />

      <div className="pb-14">
        {filters.view === "grid" ? (
          <RepositoriesGrid
            repositories={filtered}
            isLoading={isLoading}
            onDisconnect={disconnectRepository}
            onSynchronize={synchronizeRepository}
          />
        ) : (
          <RepositoryTable
            repositories={filtered}
            onDisconnect={disconnectRepository}
            onSynchronize={synchronizeRepository}
          />
        )}
      </div>

      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        onPageChange={filters.setPage}
      />
    </>
  );
}

export default Index;
