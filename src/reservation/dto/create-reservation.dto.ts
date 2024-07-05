import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty({ message: '공연 날짜 ID를 입력해주세요.' })
  concertDateId: number;

  @IsInt()
  @IsNotEmpty({ message: '예약하실 좌석 수를 입력해주세요.' })
  seatCount: number;
}
