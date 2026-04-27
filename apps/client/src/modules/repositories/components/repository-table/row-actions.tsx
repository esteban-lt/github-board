import type { Repository } from "../../../../interfaces/repository";
import { RefreshCw, Unplug, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  repository: Repository;
  onDisconnect: (id: string) => void;
  onSynchronize: (id: string) => void;
}

export const RowActions = ({ repository, onDisconnect, onSynchronize }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <a href={repository.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <ExternalLink className="size-3.5" />
            View on GitHub
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onSynchronize(repository.id)}
        >
          <RefreshCw className="size-3.5" />
          Synchronize
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 text-destructive focus:text-destructive"
          onClick={() => onDisconnect(repository.id)}
        >
          <Unplug className="size-3.5" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
