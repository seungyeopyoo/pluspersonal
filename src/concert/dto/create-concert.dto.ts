import {
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsUrl,
  IsPositive,
} from 'class-validator';
import { Category } from '../types/concertCategory.type';

export class CreateConcertDto {
  @IsInt()
  @IsNotEmpty({ message: '관리자 ID를 입력해주세요.' })
  admin_id: number;

  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 내용을 입력해주세요.' })
  content: string;

  @IsEnum(Category, { message: '유효한 카테고리를 입력해주세요.' })
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: Category;

  @IsString()
  @IsNotEmpty({ message: '장소를 입력해주세요.' })
  location: string;

  @IsInt()
  @IsPositive() //양의 정수만 입력가능함
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsUrl({}, { message: '유효한 이미지 URL을 입력해주세요.' })
  @IsNotEmpty({ message: '이미지 URL을 입력해주세요.' })
  image: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty({ message: '남은 좌석 수를 입력해주세요.' })
  seat_count: number;
}
