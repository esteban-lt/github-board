import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Settings, Unlock, Check, Lock } from 'lucide-react';

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

export const ConfigurationSummaryCard = ({ selectedRepository, selectedEvents }: Props) => {

  console.log({selectedEvents});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="size-5" />
          Configuration Summary
        </CardTitle>
        <CardDescription>
          Review your repository monitoring configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Repository */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Repository</Label>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              {selectedRepository?.isPrivate ? (
                <Lock className="size-5 text-primary" />
              ) : (
                <Unlock className="size-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium">{selectedRepository?.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {selectedRepository?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Selected Events */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Monitored Events</Label>
          {selectedEvents.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedEvents.map((label) => (
                <Badge key={label} variant="outline">
                  {label}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No events selected. Go back and pick at least one.
            </p>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Notifications</Label>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span>Dashboard Activity Feed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
