import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Github,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Header } from "@/components/app-pages/header";
import type { Step } from "../interfaces/step";
import { StepsProgress } from "../components/steps-progress";
import { NavigationButtons } from "../components/navigation-buttons";

// Mock available repositories to connect
import { gitHubRepositoriesMock } from "../mocks/github-repositories.mock";
import { ReviewStep } from "../components/review-step";
import { RepositoryFilters } from "../components/repository-filters";
import { GitHubRepositoryItem } from "../components/github-repository-item";
import { ConfigureEvents } from "../components/configure-events";

const eventTypes = [
  { id: "push", label: "Push Events", description: "Commits pushed to any branch" },
  { id: "pull_request", label: "Pull Requests", description: "PR opened, closed, or merged" },
  { id: "issues", label: "Issues", description: "Issue opened, closed, or commented" },
  { id: "star", label: "Stars", description: "Repository starred or unstarred" },
  { id: "fork", label: "Forks", description: "Repository forked" },
  { id: "release", label: "Releases", description: "New release published" },
  { id: "discussion", label: "Discussions", description: "Discussion created or answered" },
  { id: "deployment", label: "Deployments", description: "Deployment status changes" }
];

const steps: Step[] = [
  { number: 1, title: "Select Repository", description: "Choose which repository to monitor" },
  { number: 2, title: "Configure Events", description: "Select which events to track" },
  { number: 3, title: "Review & Connect", description: "Confirm your configuration" }
];

export default function Index() {

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["push", "pull_request", "issues"]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [webhookSecret, setWebhookSecret] = useState("");

  const filteredRepos = gitHubRepositoriesMock.filter(githubRepository =>
    githubRepository.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    githubRepository.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(e => e !== eventId)
        : [...prev, eventId]
    );
  };

  const isLastStep = currentStep === steps.length;

  const canProceed = useMemo(() => {
    if (currentStep === 1) return selectedRepo !== null;
    if (currentStep === 2) return selectedEvents.length > 0;
    return true;
  }, [currentStep, selectedRepo, selectedEvents]);

  const handleBack = () => {
    if (isConnecting) return;

    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      return;
    }

    navigate("/repositories");
  };

  const handleNext = () => {
    if (isConnecting) return;
    if (!canProceed) return;

    setCurrentStep((s) => Math.min(s + 1, steps.length));
  };

  const handleConnect = () => {
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      navigate("/repositories");
    }, 2000);
  };

  const selectedRepoData = gitHubRepositoriesMock.find((r) => r.id === selectedRepo) ?? null;

  const selectedEventLabels = selectedEvents
    .map((id) => eventTypes.find((e) => e.id === id)?.label)
    .filter(Boolean) as string[];

  console.log({ currentStep, selectedEvents, selectedEventLabels });

  return (
    <div className="space-y-4">
      {/* Header */}
      <Header 
        title="Connect repository"
        description="Add a GitHub repository to start monitoring its activity"
        actions={
          <Button
            variant="outline"
            onClick={() => navigate('/repositories')}
          >
            <ArrowLeft className="size-5" />
            Back
          </Button>
        }
      />

      {/* Steps progress */}
      <StepsProgress 
        steps={steps}
        currentStep={currentStep}
      />

      {/* Step Content */}
      <div className="min-h-100">
        {/* Step 1: Select Repository */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Select a Repository
                </CardTitle>
                <CardDescription>
                  Choose from your available GitHub repositories. You can connect multiple repositories.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <RepositoryFilters 
                  value={searchTerm}
                  onSearch={(searchTerm) => setSearchTerm(searchTerm)}
                />

                {/* Repository List */}
                <div className="space-y-2 max-h-87.5 overflow-y-auto pr-2">
                  {
                    filteredRepos.map((githubRepository) => (
                      <GitHubRepositoryItem
                        key={githubRepository.id}
                        repository={githubRepository}
                        isSelected={selectedRepo === githubRepository.id}
                        onSelect={setSelectedRepo}
                      />
                    ))
                  }
                </div>

                {filteredRepos.length === 0 && (
                  <div className="py-8 text-center">
                    <Github className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">No repositories found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Configure Events */}
        {
          currentStep === 2 && (
            <ConfigureEvents
              repositoryFullName={selectedRepoData?.fullName}
              eventTypes={eventTypes}
              selectedEvents={selectedEvents}
              onToggleEvent={handleEventToggle}
              webhookSecret={webhookSecret}
              onWebhookSecretChange={setWebhookSecret}
            />
          )
        }

        {/* Step 3: Review & Connect */}
        {currentStep === 3 && (
          <ReviewStep 
            selectedRepository={selectedRepoData}
            selectedEvents={selectedEventLabels}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <NavigationButtons 
        currentStep={currentStep}
        isLastStep={isLastStep}
        canProceed={canProceed}
        isConnecting={isConnecting}
        onBack={handleBack}
        onNext={handleNext}
        onConnect={handleConnect}
      />
    </div>
  );
}
