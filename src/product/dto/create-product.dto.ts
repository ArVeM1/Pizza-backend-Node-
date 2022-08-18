import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  category_id: number;

  @IsArray()
  ingredients_ids: number[];

  @IsBoolean()
  @IsOptional()
  isConfigurable: boolean;
}
