import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StatCard } from "./stat-card";
import type { DashboardStatCard } from "../interfaces/dashboard-stat-card";

interface Props {
  stats: DashboardStatCard[];
  isLoading: boolean;
}

export const StatGrid = ({ stats, isLoading = false }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="gap-2">
              <CardHeader className="flex flex-row items-start justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-3 w-32" />
              </CardFooter>
            </Card>
          ))
        : stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))
      }
    </div>
  );
};
