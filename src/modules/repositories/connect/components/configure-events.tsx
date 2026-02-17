import { WebhookEventsCard, type EventType } from "./webhook-events-card";
import { NotificationSettingsCard } from "./notification-settings-card";
import { WebhookSecurityCard } from "./webhook-security-card";

interface Props {
  repositoryFullName?: string;
  eventTypes: EventType[];
  selectedEvents: string[];
  onToggleEvent: (eventId: string) => void;

  webhookSecret: string;
  onWebhookSecretChange: (value: string) => void;
}

export const ConfigureEvents = ({
  repositoryFullName,
  eventTypes,
  selectedEvents,
  onToggleEvent,
  webhookSecret,
  onWebhookSecretChange,
}: Props) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <WebhookEventsCard
        repositoryFullName={repositoryFullName}
        eventTypes={eventTypes}
        selectedEvents={selectedEvents}
        onToggleEvent={onToggleEvent}
      />

      <div className="space-y-6">
        <NotificationSettingsCard />

        <WebhookSecurityCard
          value={webhookSecret}
          onChange={onWebhookSecretChange}
        />
      </div>
    </div>
  );
};
