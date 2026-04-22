import type { EventService } from '../events/event-service';
import type { EventRepository } from '../events/event-repository';
import type { RepositoryRepository } from '../repositories/domain/repositories/repository-repository';
import type { Prisma } from '../../generated/prisma/client';

interface ParsedEvent {
  type: string;
  actor: string;
  actorAvatar: string;
  repo: string;
  description: string;
  meta?: Prisma.InputJsonValue;
  occurredAt: string;
}

export class GitHubWebhookService {

  constructor(
    private readonly eventService: EventService,
    private readonly eventRepository: EventRepository,
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  public async parseAndSave(eventType: string, payload: any): Promise<void> {
    console.log(`[Webhook] Event received: ${eventType}`);
    const parsed = this.parseEvent(eventType, payload);
    if (!parsed) {
      console.log(`[Webhook] Unhandled event type: ${eventType}`);
      return;
    }
  
    const repository = await this.repositoryRepository.getByGithubRepoId(payload.repository?.id);
    if (!repository) {
      console.log(`[Webhook] Repo not found in DB: ${payload.repository?.id}`);
      return;
    }
  
    console.log(`[Webhook] Saving event for repo: ${repository.id}`);
    await this.eventRepository.create({ ...parsed, repositoryId: repository.id, workspaceId: repository.workspaceId });
    this.eventService.broadcast(parsed.type, parsed);
    console.log(`[Webhook] Event saved and broadcasted`);
  }

  private parseEvent(eventType: string, payload: any): ParsedEvent | null {
    const base = {
      actor: payload.sender?.login ?? 'unknown',
      actorAvatar: payload.sender?.avatar_url ?? '',
      repo: payload.repository?.full_name ?? 'unknown',
      occurredAt: new Date().toISOString(),
    };

    switch (eventType) {
      case 'push':
        return {
          ...base,
          type: 'push',
          description: payload.head_commit?.message ?? 'Pushed commits',
          meta: {
            branch: payload.ref?.replace('refs/heads/', ''),
            commitHash: payload.after,
            additions: payload.head_commit?.added?.length ?? 0,
            deletions: payload.head_commit?.removed?.length ?? 0,
          },
        };

      case 'pull_request':
        return {
          ...base,
          type: 'pull_request',
          description: payload.pull_request?.title ?? 'Pull request event',
          meta: {
            prNumber: payload.pull_request?.number,
            action: payload.action,
            tags: [`${payload.pull_request?.changed_files ?? 0} files changed`],
          },
        };

      case 'issues':
        return {
          ...base,
          type: 'issues',
          description: payload.issue?.title ?? 'Issue event',
          meta: {
            issueNumber: payload.issue?.number,
            action: payload.action,
            tags: payload.issue?.labels?.map((l: any) => l.name) ?? [],
          },
        };

      case 'star':
        return {
          ...base,
          type: 'star',
          description: payload.action === 'created'
            ? 'starred the repository'
            : 'unstarred the repository',
        };

      case 'fork':
        return {
          ...base,
          type: 'fork',
          description: `forked to ${payload.forkee?.full_name ?? 'unknown'}`,
        };

      default:
        return null;
    }
  }
}
