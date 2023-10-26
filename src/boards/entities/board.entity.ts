import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardType } from '../board.module';

// name에 테이블 명이 들어가야함
@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'TITLE' })
  title: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'CONTENTS' })
  contents: string;

  @CreateDateColumn({ name: 'CREATE_AT' })
  createAt: Date;

  @Column({ name: 'TYPE' })
  type: BoardType;

  @Column({ name: 'COUNT' })
  count: number;
}
