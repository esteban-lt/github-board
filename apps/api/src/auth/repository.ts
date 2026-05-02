import { prisma } from '@lib/prisma';
import type { GitHubUser } from '@interfaces/github-user';
import { Encryption } from '@plugins/encryption';

export class AuthRepository {

  static upsertUser = async (githubUser: GitHubUser, accessToken: string) => {
    const user = await prisma.user.upsert({
      where: {
        githubId: BigInt(githubUser.id)
      },
      update: {
        username: githubUser.login,
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
        githubAccessToken: Encryption.encrypt(accessToken),
      },
      create: {
        githubId: BigInt(githubUser.id),
        username: githubUser.login,
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
        githubAccessToken: Encryption.encrypt(accessToken),
      },
    });

    return user;
  }

  static createPersonalWorkspace = async (userId: string, username: string) => {

    const workspaceExist = await prisma.workspace.findFirst({
      where: { ownerId: userId },
    });

    if (workspaceExist) return;

    const workspace = await prisma.workspace.create({
      data: {
        ownerId: userId,
        name: `${username}'s workspace`,
        slug: username.toLocaleLowerCase(),
        plan: 'free',
      },
    });

    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: userId,
        role: 'owner',
      },
    });
  }
}
