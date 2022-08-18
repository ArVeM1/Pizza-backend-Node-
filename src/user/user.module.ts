import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CodeEntity } from '../entities/code.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity, CodeEntity]),
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class UserModule {}
