import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password, passwordConfirm, nickname } = createUserDto;
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('이미 해당 이메일로 가입된 사용자가 있습니다!');
    }
    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다 ㅠ ');
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 닉네임과 포인트를 반환
    return {
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      points: user.points,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException('등록되지 않은 이메일입니다.');
    }
    if (!existingUser.password) {
      throw new UnauthorizedException('비밀번호가 설정되지 않았습니다.');
    }
    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('입력하신 비밀번호가 일치하지 않습니다.');
    }
    const payload = { email, sub: existingUser.id }; //걍sub으로함
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
