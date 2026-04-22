import type { Response } from 'express';

export class EventService {
  
  private clients: Map<string, Response> = new Map();

  addClient(clientId: string, res: Response): void {
    this.clients.set(clientId, res);
    console.log(`[SSE] Client connected: ${clientId}. Total: ${this.clients.size}`);
  }

  removeClient(clientId: string): void {
    this.clients.delete(clientId);
    console.log(`[SSE] Client disconnected: ${clientId}. Total: ${this.clients.size}`);
  }

  broadcast(event: string, data: unknown): void {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach((res) => res.write(payload));
  }
}
