import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(dto: CreateProductDto) {
    return this.repository.save({
      title: dto.title,
      price: dto.price,
      category: { id: dto.category_id },
      ingredients: dto.ingredients_ids.map((id) => ({ id })),
    });
  }

  async search(dto: SearchProductDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.leftJoinAndSelect('p.ingredients', 'ingredient');

    if (dto.title) {
      qb.where('p.title ILIKE :title');
    }

    if (dto.category_id) {
      qb.where('p.category_id = :category_id');
    }

    if (dto.price) {
      qb.where('p.price >= :minPrice AND p.price <= :maxPrice');
    }

    if (dto.ingredients_ids) {
      qb.where('p.ingredients IN (:...ingredients_ids)');
    }

    if (dto.isConfigurable) {
      qb.where('p.isConfigurable = :isConfigurable');
    }

    if (dto.orderBy) {
      qb.orderBy(
        `p.${dto.orderBy.replace('-', '')}`,
        dto.orderBy.includes('-') ? 'ASC' : 'DESC',
      );
    } else {
      qb.orderBy('p.title', 'DESC');
    }

    const [minPrice, maxPrice] = (dto.price || '').split(',');
    const ingredients_ids = (dto.ingredients_ids || '').split(',');
    qb.setParameters({
      title: `${dto.title}`,
      category_id: dto.category_id,
      ingredients_ids,
      minPrice,
      maxPrice,
      isConfigurable: dto.isConfigurable,
    });

    const take = Number(dto.take) || 10;
    const page = dto.page ? Number(dto.page) - 1 : 0;

    qb.take(take);
    qb.skip(page);

    const [items, count] = await qb.getManyAndCount();

    return { items, count };
  }

  findAll() {
    return this.repository.find({ relations: ['ingredients'] });
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateProductDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
