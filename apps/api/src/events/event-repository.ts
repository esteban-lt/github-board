import type { Prisma } from '../../generated/prisma/client';
import { prisma } from '@lib/prisma';

interface CreateEventInput {
  type: string;
  actor: string;
  actorAvatar: string;
  repo: string;
  description: string;
  meta?: Prisma.InputJsonValue;
  occurredAt: string;
  repositoryId: string;
  workspaceId: string;
}

export class EventRepository {

  public async create(input: CreateEventInput) {
    return prisma.event.create({
      data: {
        type: input.type,
        actor: input.actor,
        actorAvatar: input.actorAvatar,
        repo: input.repo,
        description: input.description,
        meta: input.meta,
        occurredAt: new Date(input.occurredAt),
        repositoryId: input.repositoryId,
        workspaceId: input.workspaceId,
      },
    });
  }

  public async findByWorkspace(workspaceId: string, repositoryId?: string, limit = 50) {
    return prisma.event.findMany({
      where: { 
        workspaceId,
        ...(repositoryId && { repositoryId }),
      },
      orderBy: { occurredAt: 'desc' },
      take: limit,
    });
  }

  public async getCommitActivity(workspaceId: string, days = 7) {
    const since = new Date();
    since.setDate(since.getDate() - (days - 1));
    since.setHours(0, 0, 0, 0);

    const events = await prisma.event.findMany({
      where: { workspaceId, type: 'push', occurredAt: { gte: since } },
      select: { occurredAt: true, meta: true },
    });

    const activityMap = new Map<string, number>();
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      activityMap.set(d.toISOString().split('T')[0]!, 0);
    }

    for (const event of events) {
      const key = event.occurredAt.toISOString().split('T')[0]!;
      if (activityMap.has(key)) {
        const count = (event.meta as any)?.commitCount ?? 1;
        activityMap.set(key, (activityMap.get(key) ?? 0) + count);
      }
    }

    return Array.from(activityMap.entries()).map(([date, commits]) => ({
      date,
      commits,
    }));
  }
}
