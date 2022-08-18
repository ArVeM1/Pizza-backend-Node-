import {
  Column,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientEntity } from '../../ingredient/entities/ingredient.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ default: false, nullable: true })
  isConfigurable: boolean;

  @ManyToMany(() => IngredientEntity, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  ingredients: IngredientEntity[];

  @ManyToOne(() => CategoryEntity, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity;
}
