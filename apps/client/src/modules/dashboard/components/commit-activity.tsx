import { Bar, BarChart, XAxis, Rectangle } from "recharts";
import { GitCommitHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useCommitActivity } from "../hooks/use-commit-activity";

const chartConfig = {
  commits: { color: "#6366f1" },
} satisfies ChartConfig;

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CommitBar = (props: any) => {
  const { isToday, ...rest } = props;
  return <Rectangle {...rest} fill={isToday ? "#4338ca" : "#6366f180"} />;
};

export const CommitActivity = () => {
  const { data, isLoading } = useCommitActivity();

  const today = new Date().toISOString().split('T')[0];

  const chartData = data?.map((entry: { date: string; commits: number }) => ({
    day: DAY_LABELS[new Date(entry.date + 'T12:00:00').getDay()],
    commits: entry.commits,
    isToday: entry.date === today,
  })) ?? [];

  const total = chartData.reduce((sum: any, d: any) => sum + d.commits, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit activity</CardTitle>
        <CardDescription>Last 7 days, all repos</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <>
            <div className="w-full h-36 flex items-end gap-2">
              {[55, 80, 45, 95, 30, 70, 60].map((h, i) => (
                <Skeleton key={i} className="flex-1 rounded-b-none" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-3" />
              ))}
            </div>
          </>
        ) : total === 0 ? (
          <div className="flex flex-col items-center justify-center h-36 text-center">
            <GitCommitHorizontal className="size-8 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">No commit activity</p>
            <p className="text-xs text-muted-foreground mt-1">Commits from the last 7 days will appear here</p>
          </div>
        ) : (
          <>
            <ChartContainer config={chartConfig} className="w-full h-36">
              <BarChart data={chartData} barSize={28}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="commits" radius={[4, 4, 0, 0]} shape={<CommitBar />} />
              </BarChart>
            </ChartContainer>

            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="inline-block size-2 rounded-sm bg-[#4338ca]" />
                  Today
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block size-2 rounded-sm bg-[#6366f180]" />
                  Prior
                </span>
              </div>
              <span>{total} total</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
