import type { Request, Response } from 'express';

import { GitHubService } from '@github/service';
import { handleError } from '@lib/error-handler';
import { UserRepository } from '@users/user-repository';

import type { ConnectRepositoryUseCase } from '../domain/use-cases/connect-repository-use-case';
import type { DisconnectRepositoryUseCase } from '../domain/use-cases/disconnect-repository-use-case';
import type { GetRepositoriesUseCase } from '../domain/use-cases/get-repositories-use-case';
import type { GetRepositoryByIdUseCase } from '../domain/use-cases/get-repository-by-id-use-case';
import type { SetRepositoryStatusUseCase } from '../domain/use-cases/set-repository-status-use-case';
import type { SynchronizeRepositoryUseCase } from '../domain/use-cases/synchronize-repository-use-case';
import type { GetRepositoriesParams } from '../domain/types/repository-params';

interface UseCases {
  connect: ConnectRepositoryUseCase;
  disconnect: DisconnectRepositoryUseCase;
  getAll: GetRepositoriesUseCase;
  getById: GetRepositoryByIdUseCase;
  setStatus: SetRepositoryStatusUseCase;
  synchronize: SynchronizeRepositoryUseCase;
}

const VALID_SORTS = ['stars', 'forks', 'updated_at', 'name'] as const;
type ValidSort = typeof VALID_SORTS[number];

export class RepositoryController {

  constructor(
    private readonly useCases: UseCases,
  ) {}

  public connect = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
      const workspaceId = req.user?.workspaceId!;
      const githubRepoId = Number(req.body.githubRepoId);
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const data = await this.useCases.connect.execute(githubRepoId, workspaceId, githubService);
      res.status(201).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }

  public disconnect = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await this.useCases.disconnect.execute(id);
      res.status(200).json({ ok: true });
    } catch(error) {
      handleError(error, res);
    }
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const workspaceId = req.user?.workspaceId!;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
      const search = (req.query.search as string) || undefined;
      const language = (req.query.language as string) || undefined;
      const rawSort = req.query.sort as string;
      const sort: ValidSort = VALID_SORTS.includes(rawSort as ValidSort) ? (rawSort as ValidSort) : 'updated_at';
      const order: 'asc' | 'desc' = req.query.order === 'asc' ? 'asc' : 'desc';

      const params: GetRepositoriesParams = { page, limit, search, language, sort, order };
      const data = await this.useCases.getAll.execute(workspaceId, params);
      res.status(200).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const data = await this.useCases.getById.execute(id);
      return res.status(200).json(data);
    } catch(error) {
      return handleError(error, res)
    }
  }

  public setStatus = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await this.useCases.setStatus.execute(id);
      res.status(200).json({ ok: true });
    } catch (error) {
      handleError(error, res);
    }
  }

  public synchronize = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const userId = req.user?.userId!;
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const data = await this.useCases.synchronize.execute(id, githubService);
      res.status(200).json(data);
    } catch(error) {
      handleError(error, res);
    }
  }
}
