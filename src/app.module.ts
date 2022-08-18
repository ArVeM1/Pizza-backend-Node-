import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/entities/category.entity';
import { IngredientEntity } from './ingredient/entities/ingredient.entity';
import { ProductEntity } from './product/entities/product.entity';
import { UserEntity } from './user/entities/user.entity';
import { CodeEntity } from './entities/code.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'Pizza',
      entities: [
        CategoryEntity,
        IngredientEntity,
        ProductEntity,
        UserEntity,
        CodeEntity,
      ],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    IngredientModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
