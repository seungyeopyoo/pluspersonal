import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './entities/concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';
import { GetConcertsDto } from './dto/get-concert.dto';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/types/userRole.type';
import { ConcertDate } from '../concert_date/entities/concert_date.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>, // Concert 엔티티를 위한 리포지토리
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티를 위한 리포지토리
    @InjectRepository(ConcertDate)
    private concertDateRepository: Repository<ConcertDate>, // ConcertDate 리포지토리 추가
  ) {}

  // 새로운 공연을 생성하는 메소드
  async createConcert(createConcertDto: CreateConcertDto, adminId: number): Promise<Concert> {
    // 관리자 사용자 찾기
    const adminUser = await this.userRepository.findOneBy({ id: adminId });

    // 관리자가 아닌 경우 예외 발생
    if (!adminUser || adminUser.role !== Role.Admin) {
      throw new UnauthorizedException('관리자 권한이 없습니다.');
    }

    // 공연 날짜가 제공되지 않은 경우 예외 발생
    if (!createConcertDto.dates || createConcertDto.dates.length === 0) {
      throw new BadRequestException('공연 날짜를 입력해주세요.');
    }

    // 새로운 공연 엔티티 생성
    const concert = this.concertRepository.create({
      ...createConcertDto,
      admin_id: adminId,
    });

    // 공연 엔티티 저장
    const savedConcert = await this.concertRepository.save(concert);

    // 공연 날짜 엔티티 생성 및 저장
    for (const dateDto of createConcertDto.dates) {
      const concertDate = this.concertDateRepository.create({
        ...dateDto,
        concert_id: savedConcert.id,
      });
      await this.concertDateRepository.save(concertDate);
    }

    return savedConcert;
  }

  // 공연의 리스트를 조회합니다. 타이틀/카테고리를 적으면 조건대로 아니면 전체 조회
  async getConcerts(filterDto: GetConcertsDto): Promise<Concert[]> {
    const { title, category } = filterDto;
    const query = this.concertRepository.createQueryBuilder('concert');

    if (title) {
      // http://localhost:3000/concert?title=New%20Concert
      // 제목이 "New Concert"일 때 예시 주소 (%20 : 공백 표기)
      query.andWhere('concert.title LIKE :title', { title: `%${title}%` });
    }

    if (category) {
      // http://localhost:3000/concert?category=Musical
      // 카테고리별 조회 예시
      query.andWhere('concert.category = :category', { category });
    }

    // 공연 날짜와 조인
    query.leftJoinAndSelect('concert.dates', 'dates');

    // 쿼리 실행 및 결과 반환
    const concerts = await query.getMany();
    return concerts;
  }

  // ID로 공연 상세 조회
  // 현재 예매가 가능한지 여부를 반환합니다 (seat_count 남으면 예매 가능)
  async getConcertById(id: number): Promise<Concert> {
    // ID로 공연 찾기, 공연 날짜 포함
    const concert = await this.concertRepository.findOne({
      where: { id },
      relations: ['dates'], // 공연 날짜를 포함하여 조회
    });

    // 공연이 없을 경우 예외 발생
    if (!concert) {
      throw new NotFoundException(`공연이 존재하지 않습니다.`);
    }

    return concert;
  }
}
