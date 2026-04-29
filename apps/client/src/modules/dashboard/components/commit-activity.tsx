import { Bar, BarChart, XAxis, Rectangle } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <ChartContainer config={chartConfig} className="w-full h-36">
          <BarChart data={isLoading ? [] : chartData} barSize={28}>
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
          <span>{isLoading ? '...' : `${total} total`}</span>
        </div>
      </CardContent>
    </Card>
  );
};
