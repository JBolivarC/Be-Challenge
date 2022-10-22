import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: true
  })
  title!: string

  @Column({
    nullable: true
  })
  description!: string

  @Column('boolean', { default: false })
  isCompleted!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}