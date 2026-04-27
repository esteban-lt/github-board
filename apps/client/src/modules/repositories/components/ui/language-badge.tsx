import { Badge } from "@/components/ui/badge";

interface Props {
  language: string;
}

export const LanguageBadge = ({ language }: Props) => {

  return (
    <Badge 
      variant="outline" 
      className="text-xs px-1.5 py-0"
    >
      {language}
    </Badge>
  );
}
