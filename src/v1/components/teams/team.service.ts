import { TeamRepository } from "./team.repository";
import { Id } from "../../declarations";
import { Team } from "../../models/Team";
import { CreateTeamDTO, UpdateTeamDTO } from "../../models/dtos/Team";
import { CoachRepository } from "../coaches/coach.repository";
import { PlayerRepository } from "../players/player.repository";
import { CompetitionRepository } from "../competitions/competition.repository";

export class TeamService {
  constructor(
    private teamRepository = new TeamRepository(),
    private coachRepository = new CoachRepository(),
    private playerRepository = new PlayerRepository(),
    private competitionRepository = new CompetitionRepository()
    ) {}

  async Create(data: CreateTeamDTO): Promise<Team> {
    const teamData = new Team()
    teamData.id = data.id
    teamData.name = data.name
    teamData.shortName = data.shortName
    teamData.address = data.address
    teamData.tla = data.tla
    teamData.areaName = data.areaName
    teamData.players = []
    teamData.competitions = []

    if(data.coachId) {
      const coach = await this.coachRepository.GetById(data.coachId)
      teamData.coach = coach
    }

    if(data.player_ids && data.player_ids.length > 0) {
      for(const playerId of data.player_ids) {
        const player = await this.playerRepository.GetById(playerId)
        teamData.players?.push(player)
      }
    }

    if(data.competition_ids && data.competition_ids.length > 0) {
      for(const competitionId of data.competition_ids) {
        const competition = await this.competitionRepository.GetById(competitionId)
        teamData.competitions.push(competition)
      }
    }

    const team = await this.teamRepository.Create(teamData)
    return team
  }

  async GetAll(): Promise<Team[]> {
    const teams = await this.teamRepository.GetAll()
    return teams
  }

  async GetById(id: Id | number): Promise<Team> {
    const player = await this.teamRepository.GetById(id)
    return player
  }

  async Update(id: Id, data: UpdateTeamDTO): Promise<void> {
    const team = await this.teamRepository.GetById(id)
    team.id = data.id
    team.name = data.name
    team.shortName = data.shortName
    team.address = data.address
    team.tla = data.tla
    team.areaName = data.areaName

    if(data.coachId) {
      const coach = await this.coachRepository.GetById(data.coachId)
      team.coach = coach
    }

    if(data.player_ids) {
      team.players = []
      for(const playerId of data.player_ids) {
        const player = await this.playerRepository.GetById(playerId)
        team.players.push(player)
      }
    }

    if(data.competition_ids) {
      team.competitions = []
      for(const competitionId of data.competition_ids) {
        const competition = await this.competitionRepository.GetById(competitionId)
        team.competitions.push(competition)
      }
    }

    await this.teamRepository.Update(id, team)
  }

  async Delete(id: Id): Promise<void> {
    await this.teamRepository.Delete(id)
  }

  async GetByName(teamName: string, bringPlayers: boolean): Promise<Team> {
    const team = await this.teamRepository.GetByName(teamName, bringPlayers)
    return team
  }
}