import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createConcert(@Body() createConcertDto: CreateConcertDto, @Req() req) {
    return this.concertService.createConcert(createConcertDto, req.user.id);
  }
}
