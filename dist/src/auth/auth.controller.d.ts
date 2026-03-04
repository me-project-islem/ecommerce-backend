import { registerDto } from './dtos/register.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginDto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: import("./entities/user.entity").User | null;
    }>;
    register(createUserDto: registerDto): Promise<{
        accessToken: string;
    }>;
    createAdmin(createUserDto: registerDto): Promise<{
        accessToken: string;
        user: import("./entities/user.entity").User;
    }>;
    logout(res: Response): {
        message: string;
    };
    getUsers(): Promise<import("./entities/user.entity").User[]>;
    getCurrentUser(req: any): Promise<import("./entities/user.entity").User | null>;
    updateCurrentUser(req: any, body: any): Promise<import("./entities/user.entity").User>;
}
