import type { Request, Response, NextFunction } from 'express';
import JWT from '../plugins/jwt';

export interface SessionPayload {
  userId: string;
  githubId: number;
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
      request.user = payload as unknown as SessionPayload;
      next();
    }
    catch {
      response.status(401).json({ ok: false, message: 'Not authenticated' });
    }
  }
}
