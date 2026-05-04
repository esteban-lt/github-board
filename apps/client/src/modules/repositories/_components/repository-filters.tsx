import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { LanguageFilter } from "./filters/languaje-filter";
import { RepositorySearch } from "./filters/repository-search";
import { RepositoryStatusTabs, type RepositoryStatus } from "./filters/repository-status-tabs";
import { SortFilter, type RepositorySort } from "./filters/sort-filter";
import { ViewToggle, type RepositoryView } from "./filters/view-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_TABS: { label: string; value: RepositoryStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

const SORT_OPTIONS: { label: string; value: RepositorySort }[] = [
  { label: "Recently updated", value: "updated_at" },
  { label: "Most stars", value: "stars" },
  { label: "Most forks", value: "forks" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
];

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
  const hasActiveFilters = status !== "all" || language !== null;

  return (
    <>
      {/* lg+ layout — unchanged */}
      <div className="hidden lg:flex items-center gap-2">
        <RepositorySearch value={search} onChange={onSearchChange} />
        <RepositoryStatusTabs value={status} onChange={onStatusChange} counts={counts} />
        <div className="flex items-center ml-auto gap-1">
          <LanguageFilter value={language} onChange={onLanguageChange} languages={languages} />
          <SortFilter value={sort} onChange={onSortChange} />
          <ViewToggle value={view} onChange={onViewChange} />
        </div>
      </div>

      {/* < lg layout — search + view toggle + filters dropdown */}
      <div className="flex lg:hidden items-center gap-2">
        <RepositorySearch value={search} onChange={onSearchChange} />
        <div className="flex items-center ml-auto gap-1">
          <ViewToggle value={view} onChange={onViewChange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative h-8 text-xs gap-1.5">
                <SlidersHorizontal className="size-3.5" />
                Filters
                <ChevronDown className="size-3.5" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">

              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={(v) => onStatusChange(v as RepositoryStatus)}
              >
                {STATUS_TABS.map((tab) => (
                  <DropdownMenuRadioItem key={tab.value} value={tab.value} className="text-xs">
                    {tab.label}
                    {counts?.[tab.value] !== undefined && (
                      <span className="ml-auto text-muted-foreground">({counts[tab.value]})</span>
                    )}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={language === null}
                onCheckedChange={() => onLanguageChange(null)}
                className="text-xs"
              >
                All languages
              </DropdownMenuCheckboxItem>
              {languages.map((lang) => (
                <DropdownMenuCheckboxItem
                  key={lang}
                  checked={language === lang}
                  onCheckedChange={() => onLanguageChange(language === lang ? null : lang)}
                  className="text-xs"
                >
                  {lang}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(v) => onSortChange(v as RepositorySort)}
              >
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
