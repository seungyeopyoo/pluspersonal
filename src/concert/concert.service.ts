import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './entities/concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';
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

  async createConcert(
    createConcertDto: CreateConcertDto,
    adminId: number,
  ): Promise<Concert> {
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
}
