import { SignJWT, jwtVerify } from 'jose';
import { env } from './env';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

class JWT {

  public static async signToken(payload: Record<string, unknown>): Promise<string> {
    try {
      return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .setIssuedAt()
        .sign(JWT_SECRET);
    } catch {
      throw new Error('Error generating token');
    }
  }

  public static async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}

export default JWT;
