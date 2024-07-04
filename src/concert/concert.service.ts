import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './entities/concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';
import { GetConcertsDto } from './dto/get-concert.dto';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/types/userRole.type';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createConcert(createConcertDto: CreateConcertDto, adminId: number): Promise<Concert> {
    const adminUser = await this.userRepository.findOneBy({ id: adminId });

    if (!adminUser || adminUser.role !== Role.Admin) {
      throw new UnauthorizedException('관리자 권한이 없습니다.');
    }

    const concert = this.concertRepository.create({
      ...createConcertDto,
      admin_id: adminId,
    });

    return this.concertRepository.save(concert);
  }

  //   공연의 리스트를 조회합니다
  async getConcerts(filterDto: GetConcertsDto): Promise<Concert[]> {
    const { title, category } = filterDto;
    const query = this.concertRepository.createQueryBuilder('concert');

    if (title) {
      //http://localhost:3000/concert?title=New%20Concert 제목이 "New Concert" 일때 예시주소 %20 : 공백표기
      query.andWhere('concert.title LIKE :title', { title: `%${title}%` });
    }

    if (category) {
      //http://localhost:3000/concert?category=Musical 카테고리별 조회 할때예시
      query.andWhere('concert.category = :category', { category });
    }

    const concerts = await query.getMany();
    return concerts;
  }
  //   전체, 공연명 별로 나뉘어서 조회 가능합니다.
  //  전체조회 , 카테고리 별로 조회 가능하게
}
