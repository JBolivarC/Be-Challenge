export interface CreateTeamDTO {
  id: number
  name: string
  tla: string
  shortName: string
  areaName: string
  address: string
  coachId: number
  player_ids: number[]
  competition_ids: number[]
}

export interface UpdateTeamDTO extends CreateTeamDTO { }