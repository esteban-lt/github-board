import { Router } from 'express';
import { RepositoryController } from './repository-controller';
import { PostgresRepositoryDatasource } from '../infrastructure/datasources/postgres-repository-datasource';
import { RepositoryRepositoryImplementation } from '../infrastructure/repositories/repository-repository-implementation';

import { ConnectRepositoryUseCase } from '../domain/use-cases/connect-repository-use-case';
import { DisconnectRepositoryUseCase } from '../domain/use-cases/disconnect-repository-use-case';
import { GetRepositoriesUseCase } from '../domain/use-cases/get-repositories-use-case';
import { GetRepositoryByIdUseCase } from '../domain/use-cases/get-repository-by-id-use-case';
import { SetRepositoryStatusUseCase } from '../domain/use-cases/set-repository-status-use-case';
import { SynchronizeRepositoryUseCase } from '../domain/use-cases/synchronize-repository-use-case';
import { GetRepositoryByFullNameUseCase } from '@repositories/domain/use-cases/get-repository-by-full-name-use-case';

export class RepositoryRoutes {
  
  static get routes(): Router {
    const datasource = new PostgresRepositoryDatasource();
    const repository = new RepositoryRepositoryImplementation(datasource);

    const controller = new RepositoryController({
      connect: new ConnectRepositoryUseCase(repository),
      disconnect: new DisconnectRepositoryUseCase(repository),
      getAll: new GetRepositoriesUseCase(repository),
      getById: new GetRepositoryByIdUseCase(repository),
      getByFullName: new GetRepositoryByFullNameUseCase(repository),
      setStatus: new SetRepositoryStatusUseCase(repository),
      synchronize: new SynchronizeRepositoryUseCase(repository),
    });

    const router = Router();
    router.get('/', controller.getAll);
    router.post('/connect', controller.connect);

    router.get('/:id', controller.getById);
    router.get('/:owner/:repo', controller.getByFullName);
    router.get('/:owner/:repo/contributors', controller.getContributors);
    router.patch('/:id/disconnect', controller.disconnect);
    router.patch('/:id/status', controller.setStatus);
    router.put('/:id/synchronize', controller.synchronize);

    return router;
  }
}
