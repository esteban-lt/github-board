import type { Request, Response, NextFunction } from 'express';
import { JWT, type JWTPayload } from '../plugins/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export class AuthMiddleware {

  static requireAuth = (request: Request, response: Response, next: NextFunction) => {

    try {
      const token = request.cookies?.session;
      const payload = JWT.verifyToken(token);
      request.user = payload;
      next();
    } 
    catch {
      response.status(401).json({ ok: false, message: 'Not authenticated' });
    }
  }
}
