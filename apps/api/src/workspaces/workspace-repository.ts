import { prisma } from '@lib/prisma';

export class WorkspaceRepository {

  public static async getByOwnerId(ownerId: string) {
    const workspace = await prisma.workspace.findFirst({
      where: {
        ownerId: ownerId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!workspace) throw new Error('Workspace not found');

    return workspace;
  }
}
