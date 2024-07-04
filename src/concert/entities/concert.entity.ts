import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../types/concertCategory.type';

@Index('title', ['title'], { unique: true })
@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  admin_id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({
    type: 'enum',
    enum: Category,
    nullable: false,
  })
  category: Category;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'int', default: 30000, nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'int', default: 200, nullable: false })
  seat_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
