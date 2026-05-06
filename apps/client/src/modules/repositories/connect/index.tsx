import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/app-pages/header";
import { GitHubRepositoryGrid, GITHUB_SORT_TO_API, type GitHubSort } from "./_components/github-repository-grid";
import { PaginationBar } from "../_components/ui/pagination-bar";
import { useGithubRepositories } from "./_hooks/use-github-repositories";
import { useRepositories } from "../_hooks/use-repositories";
import { useConnectRepository } from "./_hooks/use-connect-repository";

const Index = () => {

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<GitHubSort>("updated");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSort = (value: GitHubSort) => {
    setSort(value);
    setPage(1);
  };

  const { sort: apiSort, direction } = GITHUB_SORT_TO_API[sort];

  const { data: githubData, isLoading } = useGithubRepositories({
    page,
    sort: apiSort,
    direction,
    search: debouncedSearch || undefined,
  });

  const { data: connectedData } = useRepositories({ limit: 20 });
  const { mutate: connectRepository, isPending, variables } = useConnectRepository();

  const connectedRepositories = connectedData?.data ?? [];
  const hasNextPage = githubData?.hasNextPage ?? false;

  return (
    <>
      <Header
        title="Connect repository"
        description="Add a GitHub repository to start monitoring its activity"
        actions={
          <Button variant='outline' onClick={() => navigate('/repositories')}><ArrowLeft />Back</Button>
        }
      />

      <div>
        <GitHubRepositoryGrid
          githubRepositories={githubData?.data}
          connectedRepositories={connectedRepositories}
          isLoading={isLoading}
          connectingRepoId={isPending ? variables : null}
          onConnect={connectRepository}
          search={searchInput}
          onSearchChange={setSearchInput}
          sort={sort}
          onSortChange={handleSort}
        />
      </div>

      <PaginationBar
        page={page}
        hasNextPage={hasNextPage}
        onPageChange={setPage}
      />
    </>
  );
}

export default Index;
