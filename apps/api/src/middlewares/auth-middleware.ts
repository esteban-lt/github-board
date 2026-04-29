import type { Request, Response, NextFunction } from 'express';
import JWT from '@plugins/jwt';
import { WorkspaceRepository } from '@workspaces/workspace-repository';

export interface SessionPayload {
  userId: string;
  githubId: number;
  workspaceId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
    }
  }
}

export class AuthMiddleware {

  static requireAuth = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.cookies?.session;
      if (!token) return response.status(401).json({ ok: false, message: 'Not authenticated' });

      const payload = await JWT.verifyToken(token);
      const sessionPayload = payload as unknown as SessionPayload;

      const workspace = await WorkspaceRepository.getByOwnerId(sessionPayload.userId);
      sessionPayload.workspaceId = workspace.id;

      request.user = sessionPayload;
      next();
    }
    catch {
      response.status(401).json({ ok: false, message: 'Not authenticated' });
    }
  }
}
