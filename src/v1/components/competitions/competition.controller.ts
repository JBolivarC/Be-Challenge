import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import { BaseController } from "../../base/base.controller";
import { CreateCompetitionDTO, UpdateCompetitionDTO } from "../../models/dtos/Competition";
import { CompetitionService } from "./competition.service";

export class CompetitionController extends BaseController {
  constructor(
    private competitionService = new CompetitionService()) { 
    super()
  }

  async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as CreateCompetitionDTO
      const competition = await this.competitionService.Create(body)
      this.Created(res, competition)
    } catch(error){
      next(error)
    }
  }

  async GetAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const competitions = await this.competitionService.GetAll()
      this.Ok(res, competitions)
    } catch(error) {
      next(error)
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { competitionId } = req.params
      const competition = await this.competitionService.GetById(competitionId)
      this.Ok(res, competition)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { competitionId } = req.params
      const body = req.body as UpdateCompetitionDTO
      await this.competitionService.Update(competitionId, body)
      const UpdatedCompetition = await this.competitionService.GetById(competitionId)
      this.Ok(res, UpdatedCompetition)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { competitionId } = req.params
      await this.competitionService.Delete(competitionId)
      this.NoContent(res)
    } catch(error) {
      next(error)
    }
  }
}