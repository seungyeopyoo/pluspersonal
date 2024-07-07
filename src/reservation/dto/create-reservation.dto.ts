import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty({ message: '공연 날짜 ID를 입력해주세요.' })
  concertDateId: number;

  @IsInt()
  @Min(1, { message: '최소 1개 이상의 좌석을 예약해야 합니다.' })
  @IsNotEmpty({ message: '예약하실 좌석 수를 입력해주세요.' })
  seatCount: number;
}
