import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentActivityItem } from "./recent-activity-item";
import type { RecentActivityEvent } from "../interfaces/recent-activity-event";

interface Props {
  activity: RecentActivityEvent[];
}

export const RecentActivity = ({ activity }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Activity
        </CardTitle>
        <CardDescription>Latest events from your repositories</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {activity.map((event) => (
            <RecentActivityItem key={event.id} {...event} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
