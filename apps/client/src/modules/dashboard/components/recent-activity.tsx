import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentActivityItem } from "./recent-activity-item";
import type { RecentActivityEvent } from "../interfaces/recent-activity-event";

const SKELETON_COUNT = 6;

interface Props {
  activity: RecentActivityEvent[];
  isLoading: boolean;
}

export const RecentActivity = ({ activity, isLoading }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Activity
        </CardTitle>
        <CardDescription>Latest events from your repositories</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="divide-y">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3.5 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-3 w-16 shrink-0" />
              </div>
            ))}
          </div>
        ) : activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="size-8 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">Events from your connected repositories will appear here</p>
          </div>
        ) : (
          <div className="divide-y">
            {activity.map((event) => (
              <RecentActivityItem key={event.id} {...event} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
