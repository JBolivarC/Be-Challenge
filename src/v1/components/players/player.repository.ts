import database from "../../config/database";
import { DatabaseRepository, Id, Query } from "../../declarations";
import { Player } from "../../models/Player";
import { NotFoundError } from "../../errors/NotFoundError";
import { Competition } from "../../models/Competition";

export class PlayerRepository implements DatabaseRepository<Player> {
  async Create(data: Partial<Player>, query?: Query | undefined): Promise<Player> {
    const repository = database.getRepository(Player)
    const player = repository.create(data)
    await repository.save(player)
    return player
  }

  async GetAll(query?: Query | undefined): Promise<Player[]> {
    const repository = database.getRepository(Player)
    const players = await repository.find({ relations: { team: true } })
    return players
  }

  async GetById(id: Id, query?: Query | undefined): Promise<Player> {
    const repository = database.getRepository(Player)
    const player = await repository.findOne({ relations: { team: true }, where: { id: id as any } })
    if (!player) throw new NotFoundError(`Player ${id} not found!`)
    return player
  }

  async Update(id: Id, data: Player, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Player)
    // await repository.update(id, data)
    await repository.manager.save(data)
    // return this.GetById(id, query)
  }

  async Delete(id: Id, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Player)
    await repository.delete(id)
  }

  async GetPlayersByLeague(leagueCode: Id, teamName: string | undefined): Promise<Player[]> {
    const competition = await database.getRepository(Competition).findOne({ where: { code: leagueCode as any } })
    if(!competition) throw new NotFoundError(`League ${leagueCode} not found!`)
    
    const repository = database.getRepository(Player)
    const query = repository.createQueryBuilder('player')
                            .innerJoin('player.team', 't', 't.id = player.teamId')
                            .innerJoin('t.competitions', 'c')
                            .where('c.code = :leagueCode', { leagueCode })

    if(teamName?.trim()) 
      query.andWhere('t.name = :teamName', { teamName })

    const players = await query.getMany()
    return players
  }
}