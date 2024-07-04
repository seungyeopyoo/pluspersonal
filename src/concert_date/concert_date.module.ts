import { Module } from '@nestjs/common';
import { ConcertDateService } from './concert_date.service';
import { ConcertDateController } from './concert_date.controller';

@Module({
  controllers: [ConcertDateController],
  providers: [ConcertDateService],
})
export class ConcertDateModule {}
