import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopRepositoryItem } from "../interfaces/top-repository-item";

const statusStyles: Record<TopRepositoryItem['status'], string> = {
  active: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
  inactive: "bg-muted text-muted-foreground hover:bg-muted",
};

export const TopRepository = ({ ownerAvatarUrl, name, language, stars, status }: TopRepositoryItem) => {
  return (
    <div className="flex items-center justify-between py-2">

      <div className="flex items-center gap-3">
        <img
          src={ownerAvatarUrl}
          alt={ownerAvatarUrl}
          className="size-8 rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="size-3" />
          {stars.toLocaleString()}
        </span>
        <Badge className={cn("rounded-full", statusStyles[status])}>
          {status}
        </Badge>
      </div>

    </div>
  );
};