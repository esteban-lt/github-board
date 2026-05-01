import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  languages: string[];
}

export const LanguageFilter = ({ value, onChange, languages }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground">
          <Filter className="size-3.5" />
          Language
          {value && (
            <span className="text-foreground font-medium">· {value}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuCheckboxItem
          checked={value === null}
          onCheckedChange={() => onChange(null)}
        >
          All languages
        </DropdownMenuCheckboxItem>
        {languages.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang}
            checked={value === lang}
            onCheckedChange={() => onChange(value === lang ? null : lang)}
          >
            {lang}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
