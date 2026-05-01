import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, GitBranch, Link } from "lucide-react";
import { LanguageBadge } from "../../_components/ui/language-badge";

interface Props {
  language?: string;
  defaultBranch: string;
  lastSync: string;
  htmlUrl: string;
}

export const AboutCard = ({ language, defaultBranch, lastSync, htmlUrl }: Props) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-xs">
        {language && <LanguageBadge language={language} />}

        <div className="flex items-center gap-2 font-mono">
          <GitBranch className="size-3 text-muted-foreground" /> 
          {defaultBranch} 
          <span className="text-muted-foreground">default branch</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-3 text-muted-foreground" />
          Last sync {lastSync}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <Link className="size-3 text-muted-foreground" />
          <a href={htmlUrl} target="_blank" className="text-blue-700 dark:text-blue-300">{htmlUrl}</a>
        </div>
      </CardContent>
    </Card>
  );
}
