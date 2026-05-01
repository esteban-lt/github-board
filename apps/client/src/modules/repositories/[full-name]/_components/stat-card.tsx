import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  value: number;
}

export const StatCard = ({ title, value }: Props) => {
  
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-medium uppercase">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}
