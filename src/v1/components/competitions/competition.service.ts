import { CompetitionRepository } from "./competition.repository";
import { Id } from "../../declarations";
import { Competition } from "../../models/Competition";
import { CreateCompetitionDTO, UpdateCompetitionDTO } from "../../models/dtos/Competition";
import { TeamRepository } from "../teams/team.repository";
import { HttpRequest } from "../../utils/HttpRequest";
import { config } from "../../config/environments";
import { NotFoundError } from "../../errors/NotFoundError";
import { Team } from "../../models/Team";
import { Player } from "../../models/Player";
import { Coach } from "../../models/Coach";
import { PlayerRepository } from "../players/player.repository";
import { CoachRepository } from "../coaches/coach.repository";

export class CompetitionService {
  constructor(
    private competitionRepository = new CompetitionRepository(),
    private teamRepository = new TeamRepository(),
    private playerRepository = new PlayerRepository(),
    private coachRepository = new CoachRepository(),
    private httpRequest = new HttpRequest(Date.now()),
    private footbal_api_base_url = config.football_api_base_url
    ) {}

  async ImportAllLeagues(): Promise<void> {
    const leagues = await this.httpRequest.Get(`${this.footbal_api_base_url}/competitions`)
    for(const league of leagues.competitions) {
      await this.ImportLeague(league.code)
    }
  }

  async ImportLeague(leagueCode: string): Promise<Competition> {
    let dbCompetition: Competition

    // Import competition if not exists in local database
    const apiCompetition = await this.httpRequest.Get(`${this.footbal_api_base_url}/competitions/${leagueCode}`)

    const competitionId = apiCompetition.id

    try {
      dbCompetition = await this.competitionRepository.GetById(competitionId)
    } catch (error) {
      if(error instanceof NotFoundError) {
        apiCompetition.areaName = apiCompetition.area.name
        dbCompetition = await this.competitionRepository.Create(apiCompetition)
      } else {
        throw error
      }
    }

    // Import teams from competitions
    const apiCompetitionTeams = await this.httpRequest.Get(`${this.footbal_api_base_url}/competitions/${leagueCode}/teams`)
    dbCompetition.teams = dbCompetition.teams ?? []

    if(apiCompetitionTeams.teams && apiCompetitionTeams.teams.length > 0) {
      for(const team of apiCompetitionTeams.teams) {
        let dbTeam: Team
        try {
          dbTeam = await this.teamRepository.GetById(team.id)
          if(dbTeam.competitions && dbTeam.competitions.length > 0) {
            if(!dbTeam.competitions.some(c => c.code === leagueCode)) {
              dbCompetition.teams.push(dbTeam)
            }
          }
        }
        catch(error) {
          if(error instanceof NotFoundError) {
            team.areaName = team.area.name
            dbTeam = team
          } else {
            throw error
          }
        }

        dbTeam.players = []
        if(team.squad && team.squad.length > 0) {

          // Import/Update team's players
          delete team.coach
          for (const player of team.squad) {
            let dbPlayer: Player
            try {
              dbPlayer = await this.playerRepository.GetById(player.id)
              dbTeam.players.push(dbPlayer)
            } catch (error) {
              if(error instanceof NotFoundError) {
                dbTeam.players.push(player)
              } else {
                throw error
              }
            }
          }
        } else {

          // Import/Update team's coach
          if(team.coach.id !== null) {
            let dbCoach: Coach
            try {
              dbCoach = await this.coachRepository.GetById(team.coach.id)
              dbTeam.coach = dbCoach
            } catch (error) {
              if(error instanceof NotFoundError) {
                dbTeam.coach = team.coach
              } else {
                throw error
              }
            }
          }
        }
        dbCompetition.teams.push(dbTeam)
      }
    }

    await this.SaveImportedCompetition(dbCompetition)
    const competition = await this.competitionRepository.GetById(competitionId)
    return competition
  }

  async SaveImportedCompetition(data: Competition): Promise<void> {
    await this.competitionRepository.SaveImportedCompetition(data)
  }

  async Create(data: CreateCompetitionDTO): Promise<Competition> {
    const competitionData = new Competition()
    competitionData.id = data.id
    competitionData.code = data.code
    competitionData.name = data.name
    competitionData.areaName = data.areaName
    competitionData.teams = []

    if(data.team_ids && data.team_ids.length > 0) {
      data.team_ids.forEach(async(teamId: number) => {
        const team = await this.teamRepository.GetById(teamId)
        competitionData.teams.push(team)
      })
    }

    const competition = await this.competitionRepository.Create(competitionData)
    return competition
  }

  async GetAll(): Promise<Competition[]> {
    const competitions = await this.competitionRepository.GetAll()
    return competitions
  }

  async GetById(id: Id): Promise<Competition> {
    const competition = await this.competitionRepository.GetById(id)
    return competition
  }

  async Update(id: Id, data: UpdateCompetitionDTO): Promise<void> {
    const competition = await this.competitionRepository.GetById(id)
    competition.code = data.code ?? competition.code
    competition.name = data.name ?? competition.name
    competition.areaName = data.areaName ?? competition.areaName

    // Update teams
    if(data.team_ids) {
      competition.teams = []
      for (const teamId of data.team_ids) {
        const team = await this.teamRepository.GetById(teamId)
        competition.teams.push(team)
      }
    }

    await this.competitionRepository.Update(id, competition)
  }

  async Delete(id: Id): Promise<void> {
    await this.competitionRepository.Delete(id)
  }
}