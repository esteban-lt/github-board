import { Button } from "@/components/ui/button";

export type RepositoryStatus = "all" | "active" | "inactive" | "public" | "private";

const TABS: { label: string; value: RepositoryStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

interface Props {
  value: RepositoryStatus;
  onChange: (value: RepositoryStatus) => void;
  counts?: Partial<Record<RepositoryStatus, number>>;
}

export const RepositoryStatusTabs = ({ value, onChange, counts }: Props) => {
  return (
    <div className="flex items-center bg-muted/50 border rounded-md p-0.5 gap-0.5">
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          variant={value === tab.value ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2.5 text-xs"
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {counts?.[tab.value] !== undefined && (
            <span className="ml-1 text-muted-foreground">({counts[tab.value]})</span>
          )}
        </Button>
      ))}
    </div>
  );
};
