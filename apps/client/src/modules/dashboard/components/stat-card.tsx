import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardStatCard, StatTrend } from "../interfaces/dashboard-stat-card";

const sparklineConfig = {
  value: { color: "#6366f1" },
} satisfies ChartConfig;

interface TrendBadgeProps {
  trend: StatTrend;
}

const TrendBadge = ({ trend }: TrendBadgeProps) => {
  const isPositive = trend.value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";
  const formatted = trend.type === 'percent'
    ? `${isPositive ? '+' : ''}${trend.value}%`
    : `${isPositive ? '+' : ''}${trend.value}`;

  return (
    <span className="flex items-center gap-1 text-xs">
      <Icon size={12} className={colorClass} />
      <span className={colorClass}>{formatted}</span>
      <span className="text-muted-foreground">{trend.label}</span>
    </span>
  );
};

export const StatCard = ({ title, metric, caption, trend, sparkline }: DashboardStatCard) => {
  const chartData = sparkline?.map((value, i) => ({ i, value }));

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{metric}</div>
      </CardContent>

      {chartData && (
        <ChartContainer config={sparklineConfig} className="w-full h-8">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="linear"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              fill="url(#sparkGradient)"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      )}

      <CardFooter className="mt-1">
        {trend ? <TrendBadge trend={trend} /> : <p className="text-xs text-muted-foreground">{caption}</p>}
      </CardFooter>
    </Card>
  );
};
