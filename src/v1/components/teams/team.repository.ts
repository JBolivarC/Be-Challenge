import database from "../../config/database";
import { DatabaseRepository, Id, Query } from "../../declarations";
import { Team } from "../../models/Team";
import { NotFoundError } from "../../errors/NotFoundError";
import { Player } from "../../models/Player";
import { Coach } from "../../models/Coach";

export class TeamRepository implements DatabaseRepository<Team> {
  async Create(data: Partial<Team>, query?: Query | undefined): Promise<Team> {
    const repository = database.getRepository(Team)
    const team = repository.create(data)
    await repository.save(team)
    return team
  }

  async GetAll(query?: Query | undefined): Promise<Team[]> {
    const repository = database.getRepository(Team)
    const teams = await repository.find({ relations: { players: true, coach: true } })
    return teams
  }

  async GetById(id: Id, query?: Query | undefined): Promise<Team> {
    const repository = database.getRepository(Team)
    const team = await repository.findOne({ relations: { players: true, coach: true }, where: { id: id as any } })
    if (!team) throw new NotFoundError(`Team ${id} not found!`)
    return team
  }

  async Update(id: Id, data: Team, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Team)
    // await repository.update(id, data)
    await repository.manager.save(data)
    // return this.GetById(id, query)
  }

  async Delete(id: Id, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Team)
    await repository.delete(id)
  }

  async GetByName(teamName: string, bringPlayers: boolean): Promise<Team> {
    const repository = database.getRepository(Team)
    const query = repository.createQueryBuilder(('team'))

    if(bringPlayers) {
      query.leftJoinAndSelect('team.coach', 'c')
      query.leftJoinAndSelect('team.players', 'p', 'team.id = p.teamId')
    }

    query.where('team.name = :teamName', { teamName })

    const team = await query.getOne()
    if (!team) throw new NotFoundError(`Team ${teamName} not found!`)

    if(bringPlayers) {
      if(team?.players?.length === 0) {
        delete team.players
      } else {
        delete team?.coach
      }
    }

    return team
  }
}