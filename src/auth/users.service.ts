import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) { }

  getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }
  getCurrentUser(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: id } });
  }

  async updateUser(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.getCurrentUser(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (attrs.email && attrs.email !== user.email) {
      const existingUser = await this.userRepo.findOne({ where: { email: attrs.email } });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    if (attrs.password) {
      const saltRounds = this.configService.get<string>('SALT_ROUNDS') || '10';
      attrs.password = await bcrypt.hash(attrs.password, Number(saltRounds));
    }

    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }
}
