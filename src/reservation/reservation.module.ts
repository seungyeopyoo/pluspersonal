import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { ConcertDate } from '../concert_date/entities/concert_date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, ConcertDate])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
