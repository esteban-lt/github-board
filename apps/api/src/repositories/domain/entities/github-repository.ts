interface Options {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPullRequests: number;
  defaultBranch: string;
  ownerAvatarUrl: string;
  isPrivate: boolean;
}

export class GitHubRepository {
  
  public readonly id: number;
  public readonly name: string;
  public readonly fullName: string;
  public readonly description: string | null;
  public readonly htmlUrl: string;
  public readonly language: string;
  public readonly stars: number;
  public readonly forks: number;
  public readonly openIssues: number;
  public readonly openPullRequests: number;
  public readonly defaultBranch: string;
  public readonly ownerAvatarUrl: string;
  public readonly isPrivate: boolean;

  constructor(options: Options) {
    this.id = options.id;
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
    this.ownerAvatarUrl = options.ownerAvatarUrl;
    this.isPrivate = options.isPrivate;
  }
}
