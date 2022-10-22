import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Coach } from "./Coach"
import { Competition } from "./Competition"
import { Player } from "./Player"

@Entity()
export class Team {
  @PrimaryColumn()
  id!: number

  @Column({
    nullable: true
  })
  name!: string

  @Column({
    nullable: true
  })
  tla!: string

  @Column({
    nullable: true
  })
  shortName!: string

  @Column({
    nullable: true
  })
  areaName!: string

  @Column({
    nullable: true
  })
  address!: string

  @OneToOne(() => Coach, (coach) => coach.team, { cascade: true })
  @JoinColumn()
  coach?: Coach

  @OneToMany(() => Player, (player) => player.team, { cascade: true })
  players?: Player[]

  @ManyToMany(() => Competition, (competition) => competition.teams)
  competitions!: Competition[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}