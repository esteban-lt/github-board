import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { ActivityEvent } from "./activity-item";

interface Repository {
  id: string;
  name: string;
  fullName: string;
}

interface Props {
  events: ActivityEvent[];
  repositories: Repository[];
  isLoading: boolean;
  selectedRepo: string | null;
  onRepoChange: (repo: string | null) => void;
  selectedPeople: string[];
  onPeopleChange: (people: string[]) => void;
}

const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-green-500",
];

const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index]!;
};

export const FiltersCard = ({ events, repositories, isLoading, selectedRepo, onRepoChange, selectedPeople, onPeopleChange }: Props) => {
  const [repoSearch, setRepoSearch] = useState("");

  const repoOptions = repositories.map(repo => ({
    name: repo.name,
    fullName: repo.fullName,
    count: events.filter(e => e.repo === repo.fullName).length,
  }));

  const people = () => {
    const counts: Record<string, number> = {};
    for (const event of events) {
      counts[event.actor] = (counts[event.actor] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const togglePerson = (person: string) => {
    if (selectedPeople.includes(person)) {
      onPeopleChange(selectedPeople.filter(p => p !== person));
    } else {
      onPeopleChange([...selectedPeople, person]);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="size-4" />
          Filter
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">

        {/* Repository */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Repository
          </span>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Find repo..."
              className="pl-8 h-8 text-sm"
              value={repoSearch}
              onChange={e => setRepoSearch(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between px-2 py-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3 w-6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {/* All repositories */}
              <button
                onClick={() => onRepoChange(null)}
                className={cn(
                  "flex items-center justify-between text-sm px-2 py-1.5 rounded-md transition-colors",
                  selectedRepo === null
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>All repositories</span>
                <span className={cn("text-xs", selectedRepo === null ? "text-primary" : "text-muted-foreground")}>
                  {events.length}
                </span>
              </button>

              {repoOptions.map(({ name, fullName, count }) => (
                <button
                  key={fullName}
                  onClick={() => onRepoChange(fullName)}
                  className={cn(
                    "flex items-center justify-between text-sm px-2 py-1.5 rounded-md transition-colors font-mono",
                    selectedRepo === fullName
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="truncate">{name}</span>
                  <span className="text-xs shrink-0 ml-2">{count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t" />

        {/* People */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            People
          </span>

          <div className="flex flex-col gap-1">
            {people().map(([person, count]) => (
              <div
                key={person}
                className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={person}
                  checked={selectedPeople.includes(person)}
                  onCheckedChange={() => togglePerson(person)}
                />
                <div className={cn("size-6 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0", getAvatarColor(person))}>
                  {getInitials(person)}
                </div>
                <label htmlFor={person} className="text-sm flex-1 cursor-pointer select-none truncate">
                  {person}
                </label>
                <span className="text-xs text-muted-foreground shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};