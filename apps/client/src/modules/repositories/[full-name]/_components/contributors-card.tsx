import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Contributor {
  login: string;
  avatarUrl: string;
}

interface Props {
  contributors: Contributor[];
}

export const ContributorsCard = ({ contributors }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributors</CardTitle>
        <p className="text-sm text-muted-foreground">{contributors.length} people</p>
      </CardHeader>

      <CardContent className="flex flex-wrap items-center gap-2">
        {contributors.map((contributor) => (
          <img
            key={contributor.login}
            src={contributor.avatarUrl}
            alt={contributor.login}
            title={contributor.login}
            className="size-8 rounded-full"
          />
        ))}
      </CardContent>
    </Card>
  );
}
