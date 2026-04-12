import type { Request, Response } from 'express';
import type { GetRepositoriesUseCase } from '../domain/use-cases/get-repositories-use-case';
import type { ConnectRepositoryUseCase } from '../domain/use-cases/connect-repository-use-case';
import type { SetRepositoryStatusUseCase } from '../domain/use-cases/set-repository-status-use-case';
import { UserRepository } from '../../users/repository';
import { GitHubService } from '../../github/service';
import { handleError } from '../../shared/lib/error-handler';
import type { GetRepositoryByIdUseCase } from '../domain/use-cases/get-repository-by-id-use-case';

interface UseCases {
  connect: ConnectRepositoryUseCase;
  getAll: GetRepositoriesUseCase;
  getById: GetRepositoryByIdUseCase;
  setStatus: SetRepositoryStatusUseCase;
}

export class RepositoryController {

  constructor(
    private readonly useCases: UseCases,
  ) {}

  public connect = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
      const githubRepoId = Number(req.body.githubRepoId);

      const [workspace, accessToken] = await Promise.all([
        UserRepository.getWorkspaceByOwnerId(userId),
        UserRepository.getAccessToken(userId),
      ]);

      const githubService = new GitHubService(accessToken);
      const data = await this.useCases.connect.execute(githubRepoId, workspace.id, githubService);
      res.status(201).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
      const workspace = await UserRepository.getWorkspaceByOwnerId(userId);
      const data = await this.useCases.getAll.execute(workspace.id);
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
}
