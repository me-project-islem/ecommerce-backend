import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { registerDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepo;
    private readonly configService;
    private readonly jwtService;
    private readonly saltRounds;
    constructor(userRepo: Repository<User>, configService: ConfigService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: User | null;
    }>;
    register(createUserDto: registerDto): Promise<{
        accessToken: string;
    }>;
    createFirstAdmin(createUserDto: registerDto): Promise<{
        accessToken: string;
        user: User;
    }>;
}
