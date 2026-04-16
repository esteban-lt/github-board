import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStatCard } from "../interfaces/dashboard-stat-card";
import { cn } from "@/lib/utils";

export const StatCard = ({ title, metric, caption, icon: Icon, iconClassName }: DashboardStatCard) => {

  return (
    <Card className="gap-2">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconClassName ?? "text-muted-foreground")} />
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{metric}</div>
      </CardContent>

      <CardFooter>
        <p className="text-muted-foreground">{caption}</p>
      </CardFooter>
    </Card>
  );
}
