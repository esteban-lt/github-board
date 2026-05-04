import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages?: number;
  hasNextPage?: boolean;
  onPageChange: (page: number) => void;
}

function getPageWindow(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export const PaginationBar = ({ page, totalPages, hasNextPage, onPageChange }: Props) => {

  const isFirst = page === 1;
  const isLast = totalPages !== undefined ? page >= totalPages : !hasNextPage;
  const pages = totalPages !== undefined ? getPageWindow(page, totalPages) : null;

  return (
    <div className="flex items-center justify-center gap-1 w-full">
      <div className="flex items-center justify-center gap-1 h-14 px-6">

        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(page - 1)}
          disabled={isFirst}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pages !== null ? (
          pages.map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="w-8 text-center text-sm text-muted-foreground select-none">
                ···
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "outline" : "ghost"}
                size="icon"
                className={`size-8 text-sm ${p === page ? "font-semibold border-foreground/30" : "text-muted-foreground"}`}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            )
          )
        ) : (
          <span className="px-3 h-8 flex items-center justify-center rounded-md border text-sm font-semibold tabular-nums">
            {page}
          </span>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(page + 1)}
          disabled={isLast}
        >
          <ChevronRight className="size-4" />
        </Button>

      </div>
    </div>
  );
};
