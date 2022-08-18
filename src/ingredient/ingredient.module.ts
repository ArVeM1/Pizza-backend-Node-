import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import {IngredientEntity} from "./entities/ingredient.entity";

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
})
export class IngredientModule {}
