export interface RecentActivityEvent {
  id: string;
  username: string;
  action: string;
  repositoryFullName: string;
  date: string;
  eventType: 'star' | 'pull_request' | 'issue' | 'push' | 'fork';
}
