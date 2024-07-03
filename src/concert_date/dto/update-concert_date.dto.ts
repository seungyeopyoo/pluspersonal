import { PartialType } from '@nestjs/mapped-types';
import { CreateConcertDateDto } from './create-concert_date.dto';

export class UpdateConcertDateDto extends PartialType(CreateConcertDateDto) {}
