import { useState, useEffect } from "react";
import type { RepositoryStatus } from "../components/filters/repository-status-tabs";
import { SORT_TO_API, type RepositorySort } from "../components/filters/sort-filter";
import type { RepositoryView } from "../components/filters/view-toggle";

export const useRepositoryFilters = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<RepositoryStatus>("all");
  const [language, setLanguage] = useState<string | null>(null);
  const [sort, setSort] = useState<RepositorySort>("updated_at");
  const [view, setView] = useState<RepositoryView>("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleLanguage = (value: string | null) => {
    setLanguage(value);
    setPage(1);
  };

  const handleSort = (value: RepositorySort) => {
    setSort(value);
    setPage(1);
  };

  const { sort: apiSort, order } = SORT_TO_API[sort];

  return {
    searchInput,
    setSearchInput,
    status,
    setStatus,
    language,
    setLanguage: handleLanguage,
    sort,
    setSort: handleSort,
    view,
    setView,
    page,
    setPage,
    apiParams: {
      search: debouncedSearch || undefined,
      language: language || undefined,
      sort: apiSort,
      order,
      page,
      limit: 20,
    },
  };
};
