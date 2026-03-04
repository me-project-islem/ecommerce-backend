"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepo;
    configService;
    jwtService;
    saltRounds;
    constructor(userRepo, configService, jwtService) {
        this.userRepo = userRepo;
        this.configService = configService;
        this.jwtService = jwtService;
        const saltRounds = this.configService.get('SALT_ROUNDS') || '10';
        this.saltRounds = Number(saltRounds);
    }
    async login(loginDto) {
        const user = await this.userRepo.findOne({
            where: { email: loginDto.email },
        });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken, user };
    }
    async register(createUserDto) {
        const existingUser = await this.userRepo.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
        const newUser = this.userRepo.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.userRepo.save(newUser);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }
    async createFirstAdmin(createUserDto) {
        const existingUser = await this.userRepo.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
        const newUser = this.userRepo.create({
            ...createUserDto,
            password: hashedPassword,
            role: 'admin',
        });
        const savedUser = await this.userRepo.save(newUser);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken, user: savedUser };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map