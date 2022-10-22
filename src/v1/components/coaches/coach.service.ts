import { CoachRepository } from "./coach.repository";
import { Id } from "../../declarations";
import { Coach } from "../../models/Coach";
import { CreateCoachDTO, UpdateCoachDTO } from "../../models/dtos/Coach";
import { TeamRepository } from "../teams/team.repository";

export class CoachService {
  constructor(
    private coachRepository = new CoachRepository(),
    private teamRepository = new TeamRepository()
    ) {}

  async Create(data: CreateCoachDTO): Promise<Coach> {
    const coachData = new Coach()

    coachData.id = data.id
    coachData.name = data.name
    coachData.nationality = data.nationality
    coachData.dateOfBirth = data.dateOfBirth

    if(data.teamId) {
      const team = await this.teamRepository.GetById(data.teamId)
      coachData.team = team
    }

    const coach = await this.coachRepository.Create(coachData)
    return coach
  }

  async GetAll(): Promise<Coach[]> {
    const coaches = await this.coachRepository.GetAll()
    return coaches
  }

  async GetById(id: Id): Promise<Coach> {
    const coach = await this.coachRepository.GetById(id)
    return coach
  }

  async Update(id: Id, data: UpdateCoachDTO): Promise<void> {

    const coach = await this.coachRepository.GetById(id)
    coach.name = data.name ?? coach.name
    coach.nationality = data.nationality ?? coach.nationality
    coach.dateOfBirth = data.dateOfBirth ?? coach.dateOfBirth
    
    if(data.teamId) {
      const team = await this.teamRepository.GetById(data.teamId)
      coach.team = team
    }

    await this.coachRepository.Update(id, coach)
  }

  async Delete(id: Id): Promise<void> {
    await this.coachRepository.Delete(id)
  }
}