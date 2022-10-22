import { PlayerRepository } from "./player.repository";
import { Id } from "../../declarations";
import { Player } from "../../models/Player";
import { CreatePlayerDTO, UpdatePlayerDTO } from "../../models/dtos/Player";
import { TeamRepository } from "../teams/team.repository";

export class PlayerService {
  constructor(
    private playerRepository = new PlayerRepository(),
    private teamRepository = new TeamRepository()
    ) {}

  async Create(data: CreatePlayerDTO): Promise<Player> {
    const playerData = new Player()
    playerData.id = data.id
    playerData.name = data.name
    playerData.nationality = data.nationality
    playerData.position = data.position
    playerData.dateOfBirth = data.dateOfBirth

    if(data.teamId) {
      const team = await this.teamRepository.GetById(data.teamId)
      playerData.team = team
    }

    const player = await this.playerRepository.Create(playerData)
    return player
  }

  async GetAll(): Promise<Player[]> {
    const players = await this.playerRepository.GetAll()
    return players
  }

  async GetById(id: Id | number): Promise<Player> {
    const player = await this.playerRepository.GetById(id)
    return player
  }

  async Update(id: Id, data: UpdatePlayerDTO): Promise<void> {
    const player = await this.playerRepository.GetById(id)
    player.name = data.name
    player.nationality = data.nationality
    player.position = data.position
    player.dateOfBirth = data.dateOfBirth

    // Update team
    if(data.teamId) {
      const team = await this.teamRepository.GetById(data.teamId)
      player.team = team
    }

    await this.playerRepository.Update(id, player)
  }

  async Delete(id: Id): Promise<void> {
    await this.playerRepository.Delete(id)
  }

  async GetPlayersByLeague(leagueCode: string, teamName: string): Promise<Player[]> {
    const players = await this.playerRepository.GetPlayersByLeague(leagueCode, teamName)
    return players
  }
}