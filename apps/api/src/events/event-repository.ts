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

  public async findByWorkspace(workspaceId: string, limit = 50) {
    return prisma.event.findMany({
      where: { workspaceId },
      orderBy: { occurredAt: 'desc' },
      take: limit,
    });
  }
}
