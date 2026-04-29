import type { Request, Response } from 'express';
import type { EventService } from './event-service';
import type { EventRepository } from './event-repository';
import { randomUUID } from 'crypto';

export class EventController {

  constructor(
    private readonly eventService: EventService,
    private readonly eventRepository: EventRepository,
  ) {}

  public stream = (req: Request, res: Response): void => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = randomUUID();
    this.eventService.addClient(clientId, res);

    req.on('close', () => {
      this.eventService.removeClient(clientId);
    });
  };

  public getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const workspaceId = req.user?.workspaceId!;
      const events = await this.eventRepository.findByWorkspace(workspaceId);
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
