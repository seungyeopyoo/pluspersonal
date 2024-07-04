import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { Concert } from '../concert/entities/concert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, User])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
