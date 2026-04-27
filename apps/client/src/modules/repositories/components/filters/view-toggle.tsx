import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RepositoryView = "grid" | "list";

interface Props {
  value: RepositoryView;
  onChange: (value: RepositoryView) => void;
}

export const ViewToggle = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className={`size-8 rounded-r-none ${value === "grid" ? "bg-muted" : ""}`}
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="size-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`size-8 rounded-l-none border-l ${value === "list" ? "bg-muted" : ""}`}
        onClick={() => onChange("list")}
      >
        <List className="size-3.5" />
      </Button>
    </div>
  );
};
