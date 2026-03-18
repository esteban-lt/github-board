import { Server } from './server';
import { Routes } from './routes';
import { env } from './plugins/env';

function main() {
  const server = new Server({
    port: env.PORT,
    routes: Routes.routes,
  });

  server.start();
}

main();
