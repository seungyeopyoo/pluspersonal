import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Category } from '../types/concertCategory.type';

export class GetConcertsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Category, { message: '유효한 카테고리를 입력해주세요.' })
  category?: Category;
}
