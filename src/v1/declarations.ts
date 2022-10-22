export type Query = Record<string, any>
export type Id = string | number
export interface DatabaseRepository<T> {
  Create(data: Partial<T>, query?: Query): Promise<T>
  GetAll(query?: Query): Promise<T[]>
  GetById(id: Id, query?: Query): Promise<T>
  Update(id: Id, data: T, query?: Query): Promise<void>
  Delete(id: Id, query?: Query): Promise<void>
}