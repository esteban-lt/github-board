import type { Request, Response } from 'express';
import { env } from '../plugins/env';
import { JWT } from '../plugins/jwt';
import { AuthService } from './service';

export class AuthController {

  static githubRedirect = (_request: Request, response: Response) => {
    const params = new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      scope: 'read:user user:email repo',
    });

    return response.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  static githubCallback = async (request: Request, response: Response) => {
    try {
      const code = request.query.code;
      if (!code || typeof(code) !== 'string') return response.redirect(`${env.FRONTEND_URL}/auth?error=missing_code`);

      const user = await AuthService.handleGitHubCallback(code);
      const token = JWT.signToken({
        userId: user.id,
        githubId: Number(user.githubId),
      });

      response.cookie('session', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response.redirect(`${env.FRONTEND_URL}`);
    }
    catch(error) {
      console.error('OAuth error:', error);
      return response.redirect(`${env.FRONTEND_URL}/auth?error=oauth_failed`);
    }
  }

  static logout = (_request: Request, response: Response) => {
    response.clearCookie('session');
    return response.json({ ok: true });
  }

  static me = async (request: Request, response: Response) => {
    return response.json({ ok: true, user: request.user });
  }
}
