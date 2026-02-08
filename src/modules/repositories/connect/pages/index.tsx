import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Github, 
  Lock, 
  Unlock,
  Star,
  GitFork,
  Check,
  Loader2,
  Webhook,
  Bell,
  Settings,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router";
import { Header } from "@/components/app-pages/header";

// Mock available repositories to connect
const mockAvailableRepos = [
  {
    id: "r1",
    name: "react-components",
    owner: "techcorp",
    fullName: "techcorp/react-components",
    description: "A collection of reusable React components with TypeScript support",
    stars: 342,
    forks: 45,
    language: "TypeScript",
    isPrivate: false,
    updatedAt: "2024-01-10"
  },
  {
    id: "r2",
    name: "backend-services",
    owner: "techcorp",
    fullName: "techcorp/backend-services",
    description: "Microservices architecture for our main platform",
    stars: 89,
    forks: 12,
    language: "Go",
    isPrivate: true,
    updatedAt: "2024-01-14"
  },
  {
    id: "r3",
    name: "documentation",
    owner: "techcorp",
    fullName: "techcorp/documentation",
    description: "Company-wide documentation and guides",
    stars: 156,
    forks: 23,
    language: "Markdown",
    isPrivate: false,
    updatedAt: "2024-01-12"
  },
  {
    id: "r4",
    name: "mobile-sdk",
    owner: "techcorp",
    fullName: "techcorp/mobile-sdk",
    description: "Cross-platform mobile SDK for third-party integrations",
    stars: 521,
    forks: 87,
    language: "Kotlin",
    isPrivate: false,
    updatedAt: "2024-01-08"
  },
  {
    id: "r5",
    name: "internal-tools",
    owner: "techcorp",
    fullName: "techcorp/internal-tools",
    description: "Internal automation and productivity tools",
    stars: 34,
    forks: 5,
    language: "Python",
    isPrivate: true,
    updatedAt: "2024-01-15"
  },
  {
    id: "r6",
    name: "analytics-dashboard",
    owner: "techcorp",
    fullName: "techcorp/analytics-dashboard",
    description: "Real-time analytics and metrics visualization platform",
    stars: 278,
    forks: 41,
    language: "TypeScript",
    isPrivate: false,
    updatedAt: "2024-01-11"
  }
];

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

export default function ConnectRepository() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["push", "pull_request", "issues"]);
  const [isConnecting, setIsConnecting] = useState(false);

  const steps = [
    { number: 1, title: "Select Repository", description: "Choose which repository to monitor" },
    { number: 2, title: "Configure Events", description: "Select which events to track" },
    { number: 3, title: "Review & Connect", description: "Confirm your configuration" }
  ];

  const filteredRepos = mockAvailableRepos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedRepoData = mockAvailableRepos.find(r => r.id === selectedRepo);

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(e => e !== eventId)
        : [...prev, eventId]
    );
  };

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      navigate("/repositories");
    }, 2000);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedRepo !== null;
    if (currentStep === 2) return selectedEvents.length > 0;
    return true;
  };

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

      {/* Progress Steps */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      currentStep > step.number 
                        ? "border-success bg-success text-success-foreground" 
                        : currentStep === step.number 
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 bg-background text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`mx-4 h-0.5 w-16 sm:w-24 lg:w-32 transition-colors ${
                      currentStep > step.number ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Repository List */}
                <div className="space-y-2 max-h-87.5 overflow-y-auto pr-2">
                  {filteredRepos.map((repo) => (
                    <div
                      key={repo.id}
                      onClick={() => setSelectedRepo(repo.id)}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                        selectedRepo === repo.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          selectedRepo === repo.id ? "bg-primary/20" : "bg-muted"
                        }`}>
                          {repo.isPrivate ? (
                            <Lock className="h-5 w-5 text-primary" />
                          ) : (
                            <Unlock className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{repo.fullName}</span>
                            {repo.isPrivate && (
                              <Badge variant="secondary" className="text-xs">Private</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {repo.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks}
                        </div>
                        <Badge variant="outline">{repo.language}</Badge>
                        {selectedRepo === repo.id && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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
        {currentStep === 2 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhook Events
                </CardTitle>
                <CardDescription>
                  Select which GitHub events you want to monitor for {selectedRepoData?.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventTypes.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventToggle(event.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedEvents.includes(event.id) 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    }`}
                  >
                    <Checkbox 
                      checked={selectedEvents.includes(event.id)}
                      className="pointer-events-none"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{event.label}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Notification Channels</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Dashboard Activity Feed</span>
                        <Badge className="bg-success text-success-foreground">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Email Notifications</span>
                        <Badge variant="secondary">Disabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Discord Integration</span>
                        <Badge variant="secondary">Not Connected</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                  <CardDescription>
                    Webhook security configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="secret">Webhook Secret (Optional)</Label>
                    <Input 
                      id="secret"
                      type="password" 
                      placeholder="Enter a secret for signature verification"
                    />
                    <p className="text-xs text-muted-foreground">
                      Used to verify webhook payloads from GitHub
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Review & Connect */}
        {currentStep === 3 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration Summary
                </CardTitle>
                <CardDescription>
                  Review your repository monitoring configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Repository */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Repository</Label>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      {selectedRepoData?.isPrivate ? (
                        <Lock className="h-5 w-5 text-primary" />
                      ) : (
                        <Unlock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{selectedRepoData?.fullName}</p>
                      <p className="text-sm text-muted-foreground">{selectedRepoData?.description}</p>
                    </div>
                  </div>
                </div>

                {/* Selected Events */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Monitored Events</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvents.map(eventId => {
                      const event = eventTypes.find(e => e.id === eventId);
                      return (
                        <Badge key={eventId} variant="secondary" className="py-1.5">
                          {event?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Notifications</Label>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      <span>Dashboard Activity Feed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-linear-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Ready to Connect
                </CardTitle>
                <CardDescription>
                  Your repository will be connected and start receiving events immediately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Webhook className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Webhook Configuration</p>
                      <p className="text-sm text-muted-foreground">
                        We'll automatically configure the webhook on your GitHub repository
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Real-time Events</p>
                      <p className="text-sm text-muted-foreground">
                        Events will appear in your activity feed within seconds
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Secure Connection</p>
                      <p className="text-sm text-muted-foreground">
                        All webhook payloads are verified and encrypted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    By connecting, you authorize GitHub Monitor to receive webhook events from this repository.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate("/repositories")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className="gradient-primary text-primary-foreground"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="gradient-primary text-primary-foreground min-w-37.5"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Connect Repository
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
