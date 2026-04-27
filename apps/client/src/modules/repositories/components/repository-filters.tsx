import type { Repository } from "../../../interfaces/repository";
import { LanguageFilter } from "./filters/languaje-filter";
import { RepositorySearch } from "./filters/repository-search";
import { RepositoryStatusTabs, type RepositoryStatus } from "./filters/repository-status-tabs";
import { SortFilter, type RepositorySort } from "./filters/sort-filter";
import { ViewToggle, type RepositoryView } from "./filters/view-toggle";

interface Props {
  repositories: Repository[];
  search: string;
  onSearchChange: (value: string) => void;
  status: RepositoryStatus;
  onStatusChange: (value: RepositoryStatus) => void;
  language: string | null;
  onLanguageChange: (value: string | null) => void;
  sort: RepositorySort;
  onSortChange: (value: RepositorySort) => void;
  view: RepositoryView;
  onViewChange: (value: RepositoryView) => void;
}

export const RepositoryFilters = ({
  repositories,
  search, onSearchChange,
  status, onStatusChange,
  language, onLanguageChange,
  sort, onSortChange,
  view, onViewChange,
}: Props) => {

  const languages = [...new Set(
    repositories.map((r) => r.language).filter(Boolean)
  )];

  const counts: Partial<Record<RepositoryStatus, number>> = {
    all: repositories.length,
    active: repositories.filter((r) => r.isActive).length,
    inactive: repositories.filter((r) => !r.isActive).length,
    public: repositories.filter((r) => !r.isPrivate).length,
    private: repositories.filter((r) => r.isPrivate).length,
  };

  return (
    <div className="flex items-center gap-2">
      <RepositorySearch value={search} onChange={onSearchChange} />
      <RepositoryStatusTabs value={status} onChange={onStatusChange} counts={counts} />
      <div className="flex items-center ml-auto gap-1">
        <LanguageFilter value={language} onChange={onLanguageChange} languages={languages} />
        <SortFilter value={sort} onChange={onSortChange} />
        <ViewToggle value={view} onChange={onViewChange} />
      </div>
    </div>
  );
};
