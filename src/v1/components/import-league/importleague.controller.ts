import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../errors/NotFoundError";
import { BaseController } from "../../base/base.controller";
import { HttpRequest } from "../../utils/HttpRequest";
import { config } from "../../config/environments";
import axios from "axios"
import { Team } from "../../models/Team";
import { Competition } from "../../models/Competition";
import { Player } from "../../models/Player";
import { Coach } from "../../models/Coach";
import { CompetitionService } from "../competitions/competition.service";
import { TeamService } from "../teams/team.service";
import { CoachService } from "../coaches/coach.service";
import { PlayerService } from "../players/player.service";

export class ImportLeagueController extends BaseController {
  constructor(
    private competitionService = new CompetitionService()
  ) { 
    super()
  }

  async ImportAllLeagues(req: Request, res: Response, next: NextFunction): Promise<void> {
    const reqTime = Date.now()
    try {
      await this.competitionService.ImportAllLeagues()
      this.Ok(res, null, 'All leagues were succesfully imported!')
    } catch (error) {
      next(error)
    }
  }

  async ImportLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { leagueCode } = req.params
      const competition = await this.competitionService.ImportLeague(leagueCode)
      this.Ok(res, competition, 'League was succesfully imported!')
    } catch(error) {
      if(error instanceof NotFoundError) { this.NotFound(res, error.message) }
      else if (axios.isAxiosError(error)) { this.BadRequest(res, error.message) }
      else next(error)
    }
  }

}