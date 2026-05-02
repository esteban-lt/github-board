import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PendingReviewItem } from "./pending-review-item";
import type { PendingReviewItemData } from "./pending-review-item";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  reviews: PendingReviewItemData[];
  isLoading: boolean;
}

export const PendingReviews = ({ reviews, isLoading }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Pending reviews</CardTitle>
          <CardDescription>PRs waiting for your attention</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-16 shrink-0" />
            </div>
          ))
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No pending reviews</p>
        ) : (
          reviews.map((item, index) => (
            <div key={item.id}>
              <PendingReviewItem {...item} />
              {index < reviews.length - 1 && <Separator />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
