import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConcertDateDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  concert_date: Date;

  @IsInt()
  @IsNotEmpty()
  seat_count: number;
}
