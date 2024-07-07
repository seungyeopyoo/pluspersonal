import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 새로운 예매를 생성하는 엔드포인트
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createReservation(@Req() req, @Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { concertDateId, seatCount } = createReservationDto;
    return this.reservationService.createReservation(req.user.id, concertDateId, seatCount);
  }

  // 특정 ID의 예매를 조회하는 엔드포인트
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getReservationById(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reservationService.getReservationById(id);
  }
}
