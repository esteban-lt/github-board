import { Webhooks } from '@octokit/webhooks';
import type { Request, Response, NextFunction } from 'express';
import { env } from '@plugins/env';

const webhooks = new Webhooks({ secret: env.GITHUB_WEBHOOK_SECRET });

export class GitHubWebhookMiddleware {

  public static async verify(req: Request, res: Response, next: NextFunction) {
    const signature = req.header('x-hub-signature-256');

    if (!signature) return res.status(400).json({ error: 'Missing signature header' });

    const rawBody = JSON.stringify(req.body);
    const isValid = await webhooks.verify(rawBody, signature);

    if (!isValid) return res.status(401).json({ error: 'Invalid signature' });

    next();
  }
}
