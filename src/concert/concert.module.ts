import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { Concert } from '../concert/entities/concert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ConcertDate } from '../concert_date/entities/concert_date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, ConcertDate, User])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
