import { prisma } from '../../lib/prisma';
import { Encryption } from '../plugins/encryption';

export class UserRepository {

  static getAccessToken = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        githubAccessToken: true
      }
    });

    if (!user?.githubAccessToken) throw new Error('User not found');

    return Encryption.decrypt(user.githubAccessToken);
  }

  static getWorkspaceByOwnerId = async (ownerId: string) => {
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
