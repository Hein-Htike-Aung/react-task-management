import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Done = 'Done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  title: string;

  @Column({ nullable: true, length: 1024 })
  description: string;

  @Column({ nullable: false, default: TaskStatus.Created })
  status: TaskStatus;
}
