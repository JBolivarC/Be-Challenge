export interface CreateCompetitionDTO {
  id: number
  name: string
  code: string
  areaName: string
  team_ids: number[]
}

export interface UpdateCompetitionDTO extends CreateCompetitionDTO { }