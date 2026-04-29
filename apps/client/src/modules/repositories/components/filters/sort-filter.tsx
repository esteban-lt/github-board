import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type RepositorySort = "updated_at" | "stars" | "forks" | "name-asc" | "name-desc";

export const SORT_TO_API: Record<RepositorySort, { sort: 'stars' | 'forks' | 'updated_at' | 'name'; order: 'asc' | 'desc' }> = {
  updated_at: { sort: 'updated_at', order: 'desc' },
  stars: { sort: 'stars', order: 'desc' },
  forks: { sort: 'forks', order: 'desc' },
  "name-asc": { sort: 'name', order: 'asc' },
  "name-desc": { sort: 'name', order: 'desc' },
};

const SORT_OPTIONS: { label: string; value: RepositorySort }[] = [
  { label: "Recently updated", value: "updated_at" },
  { label: "Most stars", value: "stars" },
  { label: "Most forks", value: "forks" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
];

interface Props {
  value: RepositorySort;
  onChange: (value: RepositorySort) => void;
}

export const SortFilter = ({ value, onChange }: Props) => {
  const current = SORT_OPTIONS.find((o) => o.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground">
          Sort: <span className="text-foreground font-medium">{current?.label}</span>
          <ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as RepositorySort)}>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} className="text-xs">
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
