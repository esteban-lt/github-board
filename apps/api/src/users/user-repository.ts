import { prisma } from '@lib/prisma';
import { Encryption } from '@plugins/encryption';

export class UserRepository {

  static getById = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatarUrl: true,
      }
    });

    if(!user) throw new Error('User not found');

    return user;
  }

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
}
