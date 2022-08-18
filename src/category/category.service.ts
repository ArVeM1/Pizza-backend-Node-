import { Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  create(dto: CreateCategoryDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateCategoryDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
