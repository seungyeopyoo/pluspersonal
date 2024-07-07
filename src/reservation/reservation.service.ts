import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { ConcertDate } from '../concert_date/entities/concert_date.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>, // Reservation 엔티티를 위한 리포지토리
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티를 위한 리포지토리
    @InjectRepository(ConcertDate)
    private concertDateRepository: Repository<ConcertDate>, // ConcertDate 엔티티를 위한 리포지토리
  ) {}

  // 새로운 예매를 생성하는 메소드
  async createReservation(userId: number, concertDateId: number, seatCount?: number): Promise<Reservation> {
    // seatCount가 제공되지 않은 경우 기본값을 1로 설정
    seatCount = seatCount ?? 1;

    // 사용자 찾기
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 공연 날짜 찾기
    const concertDate = await this.concertDateRepository.findOne({
      where: { id: concertDateId },
      relations: ['concert'], // concert 관계를 가져오기 위해 추가
    });
    if (!concertDate) {
      throw new NotFoundException('공연 날짜를 찾을 수 없습니다.');
    }

    // 보유 포인트가 공연 가격보다 낮은 경우 예외 발생
    if (user.points < concertDate.concert.price) {
      throw new BadRequestException('보유 포인트가 부족합니다.');
    }

    // 남은 좌석 수가 부족한 경우 예외 발생
    if (concertDate.seat_count < seatCount) {
      throw new BadRequestException('남은 좌석 수가 부족합니다.');
    }

    // 남은 좌석 수 업데이트
    concertDate.seat_count -= seatCount;
    await this.concertDateRepository.save(concertDate);

    // 포인트 차감
    user.points -= concertDate.concert.price;
    await this.userRepository.save(user);

    // 새로운 예매 엔티티 생성
    const reservation = this.reservationRepository.create({
      user,
      concertDate,
      seat_count: seatCount,
    });

    return this.reservationRepository.save(reservation);
  }

  // ID로 예매를 조회하는 메소드
  async getReservationById(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['user', 'concertDate', 'concertDate.concert'],
    });

    if (!reservation) {
      throw new NotFoundException('예매를 찾을 수 없습니다.');
    }

    return reservation;
  }
}
