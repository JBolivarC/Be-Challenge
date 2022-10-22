import database from "../../config/database";
import { DatabaseRepository, Id, Query } from "../../declarations";
import { Coach } from "../../models/Coach";
import { NotFoundError } from "../../errors/NotFoundError";

export class CoachRepository implements DatabaseRepository<Coach> {
  async Create(data: Partial<Coach>, query?: Query | undefined): Promise<Coach> {
    const repository = database.getRepository(Coach)
    const coach = repository.create(data)
    await repository.save(coach)
    return coach
  }

  async GetAll(query?: Query | undefined): Promise<Coach[]> {
    const repository = database.getRepository(Coach)
    const coaches = await repository.find({ relations: { team: true } })
    return coaches
  }

  async GetById(id: Id, query?: Query | undefined): Promise<Coach> {
    const repository = database.getRepository(Coach)
    const coach = await repository.findOne({ relations: { team: true }, where: { id: id as any } })
    if (!coach) throw new NotFoundError(`Coach ${id} not found!`)
    return coach
  }

  async Update(id: Id, data: Coach, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Coach)
    // await repository.update(id, data)
    await repository.manager.save(data)
    // return this.GetById(id, query)
  }

  async Delete(id: Id, query?: Query | undefined): Promise<void> {
    const repository = database.getRepository(Coach)
    await repository.delete(id)
  }
}