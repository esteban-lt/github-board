import { LanguageFilter } from "./filters/languaje-filter";
import { RepositorySearch } from "./filters/repository-search";
import { RepositoryStatusTabs, type RepositoryStatus } from "./filters/repository-status-tabs";
import { SortFilter, type RepositorySort } from "./filters/sort-filter";
import { ViewToggle, type RepositoryView } from "./filters/view-toggle";

interface Props {
  languages: string[];
  counts?: Partial<Record<RepositoryStatus, number>>;
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
  languages,
  counts,
  search, onSearchChange,
  status, onStatusChange,
  language, onLanguageChange,
  sort, onSortChange,
  view, onViewChange,
}: Props) => {
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
