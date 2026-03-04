import { Role } from '../../common/enums/role.enum';
export type UserRole = 'admin' | 'user';
export declare class registerDto {
    email: string;
    password: string;
    role?: Role;
    profileImg?: string;
}
