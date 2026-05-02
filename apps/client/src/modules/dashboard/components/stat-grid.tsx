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
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-5">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="gap-2 h-33">
              <CardHeader>
                <Skeleton className="h-4 w-16" />
              </CardHeader>
                    
              <CardContent>
                <Skeleton className="h-10 w-8" />
              </CardContent>    
                    
              <CardFooter className="flex-1 items-end">
                <Skeleton className="h-2 w-32" />
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
