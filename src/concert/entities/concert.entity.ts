import { Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from '../types/concertCategory.type';
import { Location } from '../types/concertLocation.type';
import { ConcertDate } from '../../concert_date/entities/concert_date.entity';

@Index('title', ['title'])
@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  admin_id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({
    type: 'enum',
    enum: Category,
    enumName: 'category',
    nullable: false,
  })
  category: Category;

  @Column({
    type: 'enum',
    enum: Location,
    enumName: 'location',
    nullable: false,
  })
  location: Location;

  @Column({ type: 'int', default: 30000, nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ConcertDate, (concertDate) => concertDate.concert)
  dates: ConcertDate[]; // ConcertDate 엔티티와 일대다 관계 설정
}
