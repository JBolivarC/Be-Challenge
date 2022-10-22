export interface CreatePlayerDTO {
  id: number
  name: string
  position: string
  dateOfBirth: Date
  nationality: string
  teamId: number
}

export interface UpdatePlayerDTO extends CreatePlayerDTO { }