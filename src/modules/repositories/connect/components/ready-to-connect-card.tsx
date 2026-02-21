import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

interface Bullet {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Props {
  bullets: Bullet[];
}

export const ReadyToConnectCard = ({ bullets }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github />
          Ready to Connect
        </CardTitle>
        <CardDescription>
          Your repository will be connected and start receiving events immediately
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {bullets.map((bullet) => (
            <div key={bullet.title} className="flex items-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/5">
                {bullet.icon}
              </div>
              <div>
                <p className="font-medium">{bullet.title}</p>
                <p className="text-sm text-muted-foreground">{bullet.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            By connecting, you authorize GitHub Board to receive webhook events from this repository.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
