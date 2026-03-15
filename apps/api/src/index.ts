import { Server } from './server';
import { Routes } from './routes';

function main() {
  const server = new Server({
    port: 3000,
    routes: Routes.routes,
  });

  server.start();
}

main();
