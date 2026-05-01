import { ExternalLink, RefreshCw } from "lucide-react";
import { useParams } from "react-router";
import { Header } from "@/components/app-pages/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRepository } from "./_hooks/use-repository";
// import { StatsGrid } from "./_components/stats-grid";
import { AboutCard } from "./_components/about-card";
import { useRepositoryContributors } from "./_hooks/use-repository-contributors";
import { ContributorsCard } from "./_components/contributors-card";
import { ActivityFeed } from "@/modules/activity-feed/components/activity-feed";
import { useEvents } from "@/modules/activity-feed/hooks/use-events";
import { useActivityStream } from "@/modules/activity-feed/hooks/use-activity-stream";
import { formatLastSynced } from "../_lib/format-last-synced";
import { StatusBadge } from "../_components/ui/status-badge";
import { Badge } from "@/components/ui/badge";

const Index = () => {

  const { owner, repo } = useParams();

  const { data: repository, isLoading } = useRepository({ owner: owner!, repo: repo! });
  const { data: contributors = [] } = useRepositoryContributors({ owner: owner!, repo: repo! });
  const { data: events = [] } = useEvents(repository?.id);
  useActivityStream(repository?.id);

  if (!owner || !repo) return null;
  if (isLoading) return <div>Loading...</div>;
  if (!repository) return null;

  console.log(repository);

  return (
    <>
      <Header 
        title={repo}
        description={repository.description || <i>No description</i>}
        titleSlot={
          <>
            <Badge variant="outline">{repository.isPrivate ? "Private" : "Public"}</Badge>
            <StatusBadge status={repository.isActive} />
          </>
        }
        actions={
          <>
            <Button variant="outline"><RefreshCw /> Resync</Button>
            <Button asChild>
              <a href={repository.htmlUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink /> View on GitHub
              </a>
            </Button>
          </>
        }
      />

      {/* <StatsGrid 
        repository={repository}
      /> */}

      <div className="w-full border-b">
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger disabled value="pulls">Pulls</TabsTrigger>
            <TabsTrigger disabled value="issues">Issues</TabsTrigger>
            <TabsTrigger disabled value="commits">Commits</TabsTrigger>
            <TabsTrigger disabled value="releases">Releases</TabsTrigger>
            <TabsTrigger disabled value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div>
          <ActivityFeed 
            events={events}
          />
        </div>

        <div className="flex flex-col gap-4">
          <AboutCard 
            language={repository.language} 
            defaultBranch={repository.defaultBranch}
            lastSync={formatLastSynced(repository.lastSyncedAt)}
            htmlUrl={repository.htmlUrl}
          />

          <ContributorsCard
            contributors={contributors}
          />
        </div>
      </div>

    </>
  );
}

export default Index;
