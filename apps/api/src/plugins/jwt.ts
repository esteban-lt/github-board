import jwt from 'jsonwebtoken';
import { env } from './env';

export interface JWTPayload {
  userId: string;
  githubId: number;
}

export class JWT {

  static signToken(payload: JWTPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
  }

  static verifyToken(token: string): JWTPayload {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
  }
}
