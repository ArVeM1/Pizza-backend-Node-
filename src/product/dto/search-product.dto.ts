import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  ingredients_ids: string;

  @IsString()
  @IsOptional()
  take: string;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  isConfigurable: string;

  @IsString()
  @IsOptional()
  orderBy: 'price' | 'name' | '-price' | '-name';
}
