import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ConcertDate } from '../../concert_date/entities/concert_date.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' }) // 외래 키 설정
  user: User; // User 엔티티와 다대일 관계 설정

  @ManyToOne(() => ConcertDate, (concertDate) => concertDate.reservations)
  @JoinColumn({ name: 'concert_date_id' }) // 외래 키 설정
  concertDate: ConcertDate; // ConcertDate 엔티티와 다대일 관계 설정

  @Column({ type: 'int', nullable: false })
  seat_count: number; // 예매된 좌석 수

  @CreateDateColumn()
  created_at: Date; // 생성 날짜 자동 기록

  @UpdateDateColumn()
  updated_at: Date; // 수정 날짜 자동 기록
}
