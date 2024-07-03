import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcertDateService } from './concert_date.service';
import { CreateConcertDateDto } from './dto/create-concert_date.dto';
import { UpdateConcertDateDto } from './dto/update-concert_date.dto';

@Controller('concert-date')
export class ConcertDateController {
  constructor(private readonly concertDateService: ConcertDateService) {}

  @Post()
  create(@Body() createConcertDateDto: CreateConcertDateDto) {
    return this.concertDateService.create(createConcertDateDto);
  }

  @Get()
  findAll() {
    return this.concertDateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertDateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcertDateDto: UpdateConcertDateDto) {
    return this.concertDateService.update(+id, updateConcertDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertDateService.remove(+id);
  }
}
