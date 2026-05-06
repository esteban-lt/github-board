import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import { helmetAdapter } from '@plugins/helmet';
import { rateLimitAdapter } from '@plugins/rate-limit';
import { corsAdapter } from '@plugins/cors';

interface Options {
  port: number;
  routes: Router;
}

export class Server {

  private app = express();
  private port: number;
  private routes: Router;

  constructor({ port, routes }: Options) {
    this.port = port;
    this.routes = routes;
  }

  start() {
    this.app.use(helmetAdapter);
    this.app.use(corsAdapter);
    this.app.use(rateLimitAdapter);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}