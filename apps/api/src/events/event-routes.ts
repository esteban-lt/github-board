import { Router } from 'express';
import { EventController } from './event-controller';
import { EventService } from './event-service';
import { EventRepository } from './event-repository';
import { AuthMiddleware } from '@middlewares/auth-middleware';

export const eventService = new EventService();

export class EventRoutes {

  public static get routes() {
    const router = Router();
    const eventRepository = new EventRepository();
    const eventController = new EventController(eventService, eventRepository);

    router.get('/stream', eventController.stream);
    router.get('/', AuthMiddleware.requireAuth, eventController.getEvents);

    return router;
  }
}
