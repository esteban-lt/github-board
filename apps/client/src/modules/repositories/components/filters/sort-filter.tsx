import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type RepositorySort = "recently-active" | "name-asc" | "name-desc" | "stars" | "most-commits";

const SORT_OPTIONS: { label: string; value: RepositorySort }[] = [
  { label: "Recently active", value: "recently-active" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Most stars", value: "stars" },
  { label: "Most commits", value: "most-commits" },
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
