import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Concert } from '../../concert/entities/concert.entity';

@Entity('concert_dates') // 'concert_dates' 테이블에 매핑되는 엔티티
export class ConcertDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  concert_id: number;

  @Column({ type: 'datetime', nullable: false })
  concert_date: Date;

  @Column({ type: 'int', default: 200, nullable: false })
  seat_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Concert, (concert) => concert.dates)
  @JoinColumn({ name: 'concert_id' }) // 외래 키 설정
  concert: Concert; // Concert 엔티티와 다대일 관계 설정
}
