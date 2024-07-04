import { Injectable } from '@nestjs/common';
import { CreateConcertDateDto } from './dto/create-concert_date.dto';
import { UpdateConcertDateDto } from './dto/update-concert_date.dto';

@Injectable()
export class ConcertDateService {
  create(createConcertDateDto: CreateConcertDateDto) {
    return 'This action adds a new concertDate';
  }

  findAll() {
    return `This action returns all concertDate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concertDate`;
  }

  update(id: number, updateConcertDateDto: UpdateConcertDateDto) {
    return `This action updates a #${id} concertDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} concertDate`;
  }
}
