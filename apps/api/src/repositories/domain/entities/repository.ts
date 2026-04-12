export class Repository {
  public readonly id: string;
  public readonly workspaceId: string;
  public readonly githubRepoId: number;
  public readonly name: string;
  public readonly fullName: string;
  public readonly description: string;
  public readonly htmlUrl: string;
  public readonly defaultBranch: string;
  public readonly isActive: boolean;
  public readonly isPrivate: boolean;
  public readonly lastSyncedAt: Date;

  constructor(options: {
    id: string;
    workspaceId: string;
    githubRepoId: number;
    name: string;
    fullName: string;
    description: string;
    htmlUrl: string;
    defaultBranch: string;
    isActive: boolean;
    isPrivate: boolean;
    lastSyncedAt: Date;
  }) {
    this.id = options.id;
    this.workspaceId = options.workspaceId;
    this.githubRepoId = options.githubRepoId;
    this.name = options.name;
    this.fullName = options.fullName;
    this.description = options.description;
    this.htmlUrl = options.htmlUrl;
    this.defaultBranch = options.defaultBranch;
    this.isActive = options.isActive;
    this.isPrivate = options.isPrivate;
    this.lastSyncedAt = options.lastSyncedAt;
  }
}
