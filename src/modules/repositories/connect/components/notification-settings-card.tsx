import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

export const NotificationSettingsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure how you want to receive notifications
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Notification Channels</Label>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm">Dashboard Activity Feed</span>
              <Badge className="bg-success text-success-foreground">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm">Email Notifications</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm">Discord Integration</span>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
