import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly userRepo;
    private readonly configService;
    constructor(userRepo: Repository<User>, configService: ConfigService);
    getUsers(): Promise<User[]>;
    getCurrentUser(id: number): Promise<User | null>;
    updateUser(id: number, attrs: Partial<User>): Promise<User>;
}
