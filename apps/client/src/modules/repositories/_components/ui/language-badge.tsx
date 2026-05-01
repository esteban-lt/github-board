interface Props {
  language: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript:  "#3178c6",
  JavaScript:  "#f1e05a",
  Python:      "#3572A5",
  Rust:        "#dea584",
  Go:          "#00ADD8",
  Java:        "#b07219",
  Ruby:        "#701516",
  PHP:         "#4F5D95",
  CSS:         "#563d7c",
  HTML:        "#e34c26",
  Swift:       "#F05138",
  Kotlin:      "#A97BFF",
  "C++":       "#f34b7d",
  C:           "#555555",
  "C#":        "#178600",
  Shell:       "#89e051",
  Dart:        "#00B4AB",
  Vue:         "#41b883",
};

export const LanguageBadge = ({ language }: Props) => {
  const color = LANGUAGE_COLORS[language] ?? "hsl(var(--muted-foreground))";

  return (
    <div className="flex items-center gap-1.5">
      <span
        className="size-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-muted-foreground">{language}</span>
    </div>
  );
}
