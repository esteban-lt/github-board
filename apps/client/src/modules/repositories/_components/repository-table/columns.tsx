import type { ColumnDef } from "@tanstack/react-table";
import type { Repository } from "../../../../interfaces/repository";
import { RowActions } from "./row-actions";
import { formatLastSynced } from "../../_lib/format-last-synced";
import { StatusBadge } from "../ui/status-badge";
import { LanguageBadge } from "../ui/language-badge";
import { RepositoryAvatar } from "../ui/repository-avatar";

interface ColumnMeta {
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
}

export const getColumns = ({ onDisconnect, onSynchronize }: ColumnMeta): ColumnDef<Repository>[] => [
  {
    id: "repository",
    header: "Repository",
    accessorFn: (r) => r.name,
    cell: ({ row }) => {
      const r = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <RepositoryAvatar avatarUrl="/avatar.png" name={r.name} />
          <div>
            <p className="text-sm font-semibold leading-none">{r.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{r.fullName}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "language",
    header: "Language",
    accessorFn: (r) => r.language,
    cell: ({ getValue }) => {
      const language = getValue<string>();
      if (!language) return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <LanguageBadge language={language} />
      );
    },
  },
  {
    id: "stars",
    header: "Stars",
    accessorFn: (r) => r.stars,
    cell: ({ getValue }) => (
      <span className="text-sm">{getValue<number>().toLocaleString()}</span>
    ),
  },
  {
    id: "issues",
    header: "Issues",
    accessorFn: (r) => r.openIssues,
    cell: ({ getValue }) => (
      <span className="text-sm">{getValue<number>().toLocaleString()}</span>
    ),
  },
  {
    id: "prs",
    header: "PRs",
    accessorFn: (r) => r.openPullRequests,
    cell: ({ getValue }) => (
      <span className="text-sm">{getValue<number>().toLocaleString()}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (r) => r.isActive,
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>();
      return (
        <StatusBadge status={isActive} />
      );
    },
  },
  {
    id: "lastSync",
    header: "Last Sync",
    accessorFn: (r) => r.lastSyncedAt,
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {formatLastSynced(getValue<Date>())}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <RowActions
        repository={row.original}
        onDisconnect={onDisconnect}
        onSynchronize={onSynchronize}
      />
    ),
  },
];
