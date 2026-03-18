import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './plugins/env';

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }));
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}