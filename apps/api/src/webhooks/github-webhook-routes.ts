import { Router } from 'express';
import { GitHubWebhookMiddleware } from '@middlewares/github-webhook-middleware';
import { PostgresRepositoryDatasource } from '@repositories/infrastructure/datasources/postgres-repository-datasource';
import { RepositoryRepositoryImplementation } from '@repositories/infrastructure/repositories/repository-repository-implementation';
import { GitHubWebhookController } from './github-webhook-controller';
import { GitHubWebhookService } from './github-webhook-service';
import { EventRepository } from '../events/event-repository';
import { eventService } from '../events/event-routes';

export class GitHubWebhookRoutes {

  public static get routes() {
    const router = Router();

    const eventRepository = new EventRepository();
    const repositoryDatasource = new PostgresRepositoryDatasource();
    const repositoryRepository = new RepositoryRepositoryImplementation(repositoryDatasource);

    const githubWebhookService = new GitHubWebhookService(eventService, eventRepository, repositoryRepository);
    const githubWebhookController = new GitHubWebhookController(githubWebhookService);

    router.post('/', GitHubWebhookMiddleware.verify, githubWebhookController.handleEvent);

    return router;
  }
}