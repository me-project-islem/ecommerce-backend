import { Role } from '@/src/common/enums/role.enum';
export type UserRole = 'admin' | 'user';
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    role: Role;
    profileImg?: string;
}
