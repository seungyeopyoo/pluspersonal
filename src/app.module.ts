import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConcertDateModule } from './concert_date/concert_date.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConcertModule,
    ReservationModule,
    ConcertDateModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
