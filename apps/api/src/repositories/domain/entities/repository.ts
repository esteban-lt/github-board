interface Options {
  id: string;
  workspaceId: string;
  githubRepoId: number;
  webhookId: number;
  name: string;
  fullName: string;
  description?: string;
  htmlUrl: string;
  language?: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPullRequests: number;
  defaultBranch: string;
  isConnected: boolean;
  isActive: boolean;
  isPrivate: boolean;
  lastSyncedAt: Date;
}

export class Repository {
  public readonly id: string;
  public readonly workspaceId: string;
  public readonly githubRepoId: number;
  public readonly webhookId: number;
  public readonly name: string;
  public readonly fullName: string;
  public readonly description?: string;
  public readonly htmlUrl: string;
  public readonly language?: string;
  public readonly stars: number;
  public readonly forks: number;
  public readonly openIssues: number;
  public readonly openPullRequests: number;
  public readonly defaultBranch: string;
  public readonly isConnected: boolean;
  public readonly isActive: boolean;
  public readonly isPrivate: boolean;
  public readonly lastSyncedAt: Date;

  constructor(options: Options) {
    this.id = options.id;
    this.workspaceId = options.workspaceId;
    this.githubRepoId = options.githubRepoId;
    this.webhookId = options.webhookId;
    this.name = options.name;
    this.fullName = options.fullName;
    this.description = options.description;
    this.htmlUrl = options.htmlUrl;
    this.language = options.language;
    this.stars = options.stars;
    this.forks = options.forks;
    this.openIssues = options.openIssues;
    this.openPullRequests = options.openPullRequests;
    this.defaultBranch = options.defaultBranch;
    this.isConnected = options.isConnected;
    this.isActive = options.isActive;
    this.isPrivate = options.isPrivate;
    this.lastSyncedAt = options.lastSyncedAt;
  }
}
