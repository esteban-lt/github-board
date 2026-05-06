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
import type { GetRepositoryByFullNameUseCase } from '../domain/use-cases/get-repository-by-full-name-use-case';
import { GetRepositoriesDto } from '../domain/dtos/get-repositories-dto';

interface UseCases {
  connect: ConnectRepositoryUseCase;
  disconnect: DisconnectRepositoryUseCase;
  getAll: GetRepositoriesUseCase;
  getById: GetRepositoryByIdUseCase;
  getByFullName: GetRepositoryByFullNameUseCase;
  setStatus: SetRepositoryStatusUseCase;
  synchronize: SynchronizeRepositoryUseCase;
}

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
      const id = req.params.id;
      const userId = req.user?.userId!;
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      await this.useCases.disconnect.execute(id as string, githubService);
      res.status(200).json({ ok: true });
    } catch(error) {
      handleError(error, res);
    }
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const workspaceId = req.user?.workspaceId!;
      const [error, dto] = GetRepositoriesDto.create(req.query);
      if (error) return res.status(400).json({ error });
      const data = await this.useCases.getAll.execute(workspaceId, dto!);
      res.status(200).json(data);
    } catch (error) {
      handleError(error, res);
    }
  }

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await this.useCases.getById.execute(id as string);
      return res.status(200).json(data);
    } catch(error) {
      return handleError(error, res);
    }
  }

  public getByFullName = async (req: Request, res: Response) => {
    try {
      const workspaceId = req.user?.workspaceId!;
      const { owner, repo } = req.params;
      const fullName = `${owner}/${repo}`;
      const data = await this.useCases.getByFullName.execute(workspaceId, fullName);
      return res.status(200).json(data);
    } catch(error) {
      return handleError(error, res);
    }
  }

  public getContributors = async (req: Request, res: Response) => {
    try {
      const { owner, repo } = req.params;
      const userId = req.user?.userId!;
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const data = await githubService.getRepositoryContributors(owner as string, repo as string);
      return res.status(200).json(data);
    } catch(error) {
      handleError(error, res);
    }
  }

  public setStatus = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await this.useCases.setStatus.execute(id as string);
      res.status(200).json({ ok: true });
    } catch (error) {
      handleError(error, res);
    }
  }

  public synchronize = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req.user?.userId!;
      const accessToken = await UserRepository.getAccessToken(userId);
      const githubService = new GitHubService(accessToken);
      const data = await this.useCases.synchronize.execute(id as string, githubService);
      res.status(200).json(data);
    } catch(error) {
      handleError(error, res);
    }
  }
}
