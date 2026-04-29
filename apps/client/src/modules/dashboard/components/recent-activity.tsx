import { Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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

      <CardContent className="flex flex-col">
        {activity.map((event, index) => (
          <div key={event.id}>
            <RecentActivityItem {...event} />
            {index < activity.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
