import { useState } from "react";
import type { Repository } from "../../../interfaces/repository";
import type { RepositoryStatus } from "../components/filters/repository-status-tabs";
import type { RepositorySort } from "../components/filters/sort-filter";
import type { RepositoryView } from "../components/filters/view-toggle";

export const useRepositoryFilters = (repositories: Repository[] = []) => {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RepositoryStatus>("all");
  const [language, setLanguage] = useState<string | null>(null);
  const [sort, setSort] = useState<RepositorySort>("recently-active");
  const [view, setView] = useState<RepositoryView>("grid");

  let filtered = [...repositories];

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.fullName.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  }

  if (status === "active") filtered = filtered.filter((r) => r.isActive);
  if (status === "inactive") filtered = filtered.filter((r) => !r.isActive);
  if (status === "public") filtered = filtered.filter((r) => !r.isPrivate);
  if (status === "private") filtered = filtered.filter((r) => r.isPrivate);

  if (language) filtered = filtered.filter((r) => r.language === language);

  switch (sort) {
    case "recently-active":
      filtered.sort((a, b) => new Date(b.lastSyncedAt).getTime() - new Date(a.lastSyncedAt).getTime());
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "stars":
      filtered.sort((a, b) => b.stars - a.stars);
      break;
    case "most-commits":
      filtered.sort((a, b) => new Date(b.lastSyncedAt).getTime() - new Date(a.lastSyncedAt).getTime());
      break;
  }

  return {
    search, setSearch,
    status, setStatus,
    language, setLanguage,
    sort, setSort,
    view, setView,
    filtered,
  };
};
