import { IsString, IsInt, IsEnum, IsNotEmpty, IsUrl, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../types/concertCategory.type';
import { CreateConcertDateDto } from '../../concert_date/dto/create-concert_date.dto';

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
  @IsPositive() // 양의 정수만 입력가능함
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsUrl({}, { message: '유효한 이미지 URL을 입력해주세요.' })
  @IsNotEmpty({ message: '이미지 URL을 입력해주세요.' })
  image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConcertDateDto)
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' }) // 공연 날짜 필수 입력
  dates: CreateConcertDateDto[]; // 공연 날짜 배열
}
