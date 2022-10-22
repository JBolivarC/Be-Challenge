import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm"
import { Team } from "./Team"

@Entity()
export class Coach {
  @PrimaryColumn()
  id!: number

  @Column({
    nullable: true
  })
  name!: string

  @Column({ 
    nullable: true
  })
  dateOfBirth!: Date

  @Column({ 
    nullable: true
  })
  nationality!: string

  @OneToOne(() => Team, (team) => team.coach)
  team!: Team

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}