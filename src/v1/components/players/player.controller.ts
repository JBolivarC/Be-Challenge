import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import { BaseController } from "../../base/base.controller";
import { CreatePlayerDTO, UpdatePlayerDTO } from "../../models/dtos/Player";
import { PlayerService } from "./player.service";

export class PlayerController extends BaseController {
  constructor(
    private playerService = new PlayerService()
    ) { 
    super()
  }

  async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as CreatePlayerDTO
      const player = await this.playerService.Create(body)
      this.Created(res, player)
    } catch(error) {
      next(error)
    }
  }

  async GetAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const players = await this.playerService.GetAll()
      this.Ok(res, players)
    } catch(error) {
      next(error)
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { playerId } = req.params
      const player = await this.playerService.GetById(playerId)
      this.Ok(res, player)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { playerId } = req.params
      const body = req.body as UpdatePlayerDTO
      await this.playerService.Update(playerId, body)
      const updatedPlayer = await this.playerService.GetById(playerId)
      this.Ok(res, updatedPlayer)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { playerId } = req.params
      await this.playerService.Delete(playerId)
      this.NoContent(res)
    } catch(error) {
      next(error)
    }
  }

  async GetPlayersByLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leagueCode = req.query.leagueCode as string
      const teamName = req.query.teamName as string
      const players = await this.playerService.GetPlayersByLeague(leagueCode, teamName)
      this.Ok(res, players)
    } catch(error) {
      next(error)
    }
  }
}