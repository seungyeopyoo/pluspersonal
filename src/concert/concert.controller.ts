import { Controller, Post, Get, Body, UseGuards, Req, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { GetConcertsDto } from './dto/get-concert.dto';
import { AuthGuard } from '@nestjs/passport';
import { Concert } from './entities/concert.entity';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  // 새로운 공연을 생성하는 엔드포인트
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createConcert(@Body() createConcertDto: CreateConcertDto, @Req() req) {
    return this.concertService.createConcert(createConcertDto, req.user.id);
  }

  // 공연의 리스트를 조회하는 엔드포인트, 타이틀/카테고리 필터 적용 가능
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async getConcerts(@Query() filterDto: GetConcertsDto) {
    return this.concertService.getConcerts(filterDto);
  }

  // 특정 ID의 공연을 조회하는 엔드포인트
  @Get(':id')
  async getConcertById(@Param('id', ParseIntPipe) id: number): Promise<Concert> {
    return this.concertService.getConcertById(id);
  }
}
