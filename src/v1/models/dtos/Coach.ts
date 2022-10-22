export interface CreateCoachDTO {
  id: number
  name: string
  dateOfBirth: Date
  nationality: string
  teamId: number
}

export interface UpdateCoachDTO extends CreateCoachDTO { }