import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Webhook } from "lucide-react";

export interface EventType {
  id: string;
  label: string;
  description: string;
}

interface Props {
  repositoryFullName?: string;
  eventTypes: EventType[];
  selectedEvents: string[];
  onToggleEvent: (eventId: string) => void;
}

export const WebhookEventsCard = ({
  repositoryFullName,
  eventTypes,
  selectedEvents,
  onToggleEvent,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Webhook Events
        </CardTitle>

        <CardDescription>
          Select which GitHub events you want to monitor
          {repositoryFullName ? ` for ${repositoryFullName}` : ""}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {eventTypes.map((event) => {
          const checked = selectedEvents.includes(event.id);

          return (
            <div
              key={event.id}
              onClick={() => onToggleEvent(event.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onToggleEvent(event.id);
              }}
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                checked ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <Checkbox checked={checked} className="pointer-events-none" />

              <div className="flex-1">
                <p className="font-medium">{event.label}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
