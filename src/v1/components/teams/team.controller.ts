import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import { BaseController } from "../../base/base.controller";
import { CreateTeamDTO } from "../../models/dtos/Team";
import { TeamService } from "./team.service";

export class TeamController extends BaseController {
  constructor(
    private teamService = new TeamService()
    ) { 
    super()
  }

  async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as CreateTeamDTO
      const team = await this.teamService.Create(body)
      this.Created(res, team)
    } catch(error){
      next(error)
    }
  }

  async GetAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await this.teamService.GetAll()
      this.Ok(res, teams)
    } catch(error) {
      next(error)
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params
      const team = await this.teamService.GetById(teamId)
      this.Ok(res, team)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params
      const { body } = req
      await this.teamService.Update(teamId, body)
      const team = await this.teamService.GetById(teamId)
      this.Ok(res, team)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params
      await this.teamService.Delete(teamId)
      this.NoContent(res)
    } catch(error) {
      next(error)
    }
  }

  async GetByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = req.query.name as string
      const players = req.query.players as string
      const team = await this.teamService.GetByName(name, players === 'S')
      this.Ok(res, team)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async GetTeamPlayers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teamId } = req.params
      const team = await this.teamService.GetById(teamId)
      const data: any = { }
      
      if(team.players?.length === 0) {
        data.coach = team.coach
      } else {
        data.players = team.players
      }

      this.Ok(res, data)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }
}