import { Request, Response, NextFunction } from "express";
import { CoachRepository } from "./coach.repository";
import { NotFoundError } from "../../errors/NotFoundError";
import { BaseController } from "../../base/base.controller";
import { CreateCoachDTO, UpdateCoachDTO } from "../../models/dtos/Coach";
import { CoachService } from "./coach.service";

export class CoachController extends BaseController {
  constructor(
    private repository = new CoachRepository(),
    private coachService = new CoachService()
    ) { 
    super()
  }

  async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as CreateCoachDTO
      const coach = await this.coachService.Create(body)
      this.Created(res, coach)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async GetAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const coaches = await this.coachService.GetAll()
      this.Ok(res, coaches)
    } catch(error) {
      next(error)
    }
  }

  async GetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { coachId } = req.params
      const coach = await this.coachService.GetById(coachId)
      this.Ok(res, coach)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { coachId } = req.params
      const body = req.body as UpdateCoachDTO
      await this.coachService.Update(coachId, body)
      const updatedCoach = await this.repository.GetById(coachId)
      this.Ok(res, updatedCoach)
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else next(error)
    }
  }

  async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { coachId } = req.params
      await this.coachService.Delete(coachId)
      this.NoContent(res)
    } catch(error) {
      next(error)
    }
  }
}