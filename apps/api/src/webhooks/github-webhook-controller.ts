import type { Request, Response } from 'express';
import type { GitHubWebhookService } from './github-webhook-service';

export class GitHubWebhookController {

  constructor(
    private readonly githubWebhookService: GitHubWebhookService,
  ) {}

  public handleEvent = async (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event');
    if (!githubEvent) return res.status(400).json({ error: 'Missing GitHub event header' });

    await this.githubWebhookService.parseAndSave(githubEvent, req.body);
    return res.status(200).json({ message: 'Event received' });
  };
}
