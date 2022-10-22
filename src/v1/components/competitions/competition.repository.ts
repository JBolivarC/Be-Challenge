import database from "../../config/database";
import { DatabaseRepository, Id, Query } from "../../declarations";
import { Competition } from "../../models/Competition";
import { NotFoundError } from "../../errors/NotFoundError";

export class CompetitionRepository implements DatabaseRepository<Competition> {

  async SaveImportedCompetition(data: Partial<Competition>): Promise<void> {
    const repository = database.getRepository(Competition)
    await repository.manager.save(data)
  }

  async Create(data: Partial<Competition>): Promise<Competition> {
    const repository = database.getRepository(Competition)
    const competition = repository.create(data)
    await repository.save(competition)
    return competition
  }

  async GetAll(query?: Query | undefined): Promise<Competition[]> {
    const repository = database.getRepository(Competition)
    const competitions = await repository.find({ relations: { teams: true } })
    return competitions
  }

  async GetById(id: Id, query?: Query | undefined): Promise<Competition> {
    const repository = database.getRepository(Competition)
    const competition = await repository.findOne({ relations: { teams: true }, where: { id: id as any } })
    if (!competition) throw new NotFoundError(`Competition ${id} not found!`)
    return competition
  }

  async Update(id: Id, data: Competition, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Competition)
    // await repository.update(id, data)
    await repository.manager.save(data)
    // return this.GetById(id, query)
  }

  async Delete(id: Id, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Competition)
    await repository.delete(id)
  }

  // async AddTeam(id: Id, team: Team): Promise<void> {
  //   const repository = database.getRepository(Competition)
  //   const competition = await repository.findOne({ relations: { teams: true }, where: { id: id as any } })
  //   competition?.teams?.push(team)
  //   await repository.manager.save(competition)
  // }
}