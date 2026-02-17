import { Webhook, Bell, Shield } from "lucide-react";
import { ConfigurationSummaryCard } from "./configuration-summary-card";
import { ReadyToConnectCard } from "./ready-to-connect-card";

export interface Repository {
  id: string;
  fullName: string;
  description: string;
  isPrivate: boolean;
}

interface Props {
  selectedRepository: Repository | null;
  selectedEvents: string[];
}

export const ReviewStep = ({ selectedRepository, selectedEvents }: Props) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ConfigurationSummaryCard
        selectedRepository={selectedRepository}
        selectedEvents={selectedEvents}
      />

      <ReadyToConnectCard
        bullets={[
          {
            icon: <Webhook className="h-4 w-4 text-primary" />,
            title: "Webhook Configuration",
            description:
              "We'll automatically configure the webhook on your GitHub repository",
          },
          {
            icon: <Bell className="h-4 w-4 text-primary" />,
            title: "Real-time Events",
            description: "Events will appear in your activity feed within seconds",
          },
          {
            icon: <Shield className="h-4 w-4 text-primary" />,
            title: "Secure Connection",
            description:
              "All webhook payloads are verified and encrypted",
          },
        ]}
      />
    </div>
  );
};
