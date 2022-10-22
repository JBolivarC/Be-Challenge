export interface CreateTaskDTO {
  id: number
  title: string
  description: string
  isCompleted: boolean
}

export interface UpdateTaskDTO extends CreateTaskDTO { }