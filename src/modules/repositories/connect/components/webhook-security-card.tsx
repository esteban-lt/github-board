import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const WebhookSecurityCard = ({ value, onChange }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security
        </CardTitle>
        <CardDescription>
          Webhook security configuration
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="secret">Webhook Secret (Optional)</Label>
          <Input
            id="secret"
            type="password"
            placeholder="Enter a secret for signature verification"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Used to verify webhook payloads from GitHub
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
