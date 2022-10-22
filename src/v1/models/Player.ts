import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Team } from "./Team"

@Entity()
export class Player {
  @PrimaryColumn()
  id!: number

  @Column({
    nullable: true
  })
  name!: string

  @Column({
    nullable: true
  })
  position!: string

  @Column({
    nullable: true
  })
  dateOfBirth!: Date

  @Column({
    nullable: true
  })
  nationality!: string

  @ManyToOne(() => Team, (team) => team.players)
  team!: Team

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}