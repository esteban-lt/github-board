import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ReviewStatus = 'review' | 'changes' | 'approved';

const statusConfig: Record<ReviewStatus, { label: string; className: string }> = {
  review:   { label: 'Review',   className: 'bg-purple-50 text-purple-600 border-purple-200' },
  changes:  { label: 'Changes',  className: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  approved: { label: 'Approved', className: 'bg-green-50  text-green-600  border-green-200'  },
};

export interface PendingReviewItemData {
  id: string;
  title: string;
  repo: string;
  prNumber: number;
  additions: number;
  deletions: number;
  status: ReviewStatus;
  url: string;
  author: string;
  authorAvatarUrl?: string;
}

export const PendingReviewItem = ({ title, repo, prNumber, additions, deletions, status, url, author, authorAvatarUrl }: PendingReviewItemData) => {
  const { label, className } = statusConfig[status];
  const initials = author.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={authorAvatarUrl} alt={author} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline flex items-center gap-1 truncate"
          >
            {title}
            <ExternalLink size={11} className="text-muted-foreground shrink-0" />
          </a>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{repo} #{prNumber}</span>
            <span className="text-green-600">+{additions}</span>
            <span className="text-red-500">−{deletions}</span>
          </div>
        </div>

        <Badge variant="outline" className={`shrink-0 ml-4 ${className}`}>
          {label}
        </Badge>
      </div>
    </div>
  );
};
