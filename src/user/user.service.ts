import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CodeEntity } from '../entities/code.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(CodeEntity)
    private codeRepository: Repository<CodeEntity>,
    private jwtService: JwtService,
  ) {}

  async sendSMSCode(phone: string) {
    const code = String(Math.round(Math.random() * 9999));

    const findCode = await this.codeRepository.findOne({
      phone,
    });

    if (findCode) {
      throw new ForbiddenException('Временный код был уже отправлен!');
    }

    return this.codeRepository.save({
      phone,
      value: code,
    });
  }

  async checkSMSCode(phone: string, code: string) {
    const findCode = await this.codeRepository.findOne({
      phone,
      value: code,
    });

    if (findCode) {
      await this.codeRepository.delete(findCode.id);

      const userData = await this.repository.save({
        phone,
      });

      const token = this.jwtService.sign(userData);

      return { status: 'OK', token };
    }

    return { status: 'Неверный код' };
  }

  getMe(userId: string) {
    return this.repository.findOne(userId);
  }
}
