import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Team } from "./Team"

@Entity()
export class Competition {
  @PrimaryColumn()
  id!: number

  @Column({
    nullable: true
  })
  name!: string

  @Column({
    nullable: true
  })
  code!: string

  @Column({
    nullable: true
  })
  areaName!: string

  @ManyToMany(() => Team, (team) => team.competitions, { cascade: true })
  @JoinTable()
  teams!: Team[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}