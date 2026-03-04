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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    userRepo;
    configService;
    constructor(userRepo, configService) {
        this.userRepo = userRepo;
        this.configService = configService;
    }
    getUsers() {
        return this.userRepo.find();
    }
    getCurrentUser(id) {
        return this.userRepo.findOne({ where: { id: id } });
    }
    async updateUser(id, attrs) {
        const user = await this.getCurrentUser(id);
        if (!user) {
            throw new Error('User not found');
        }
        if (attrs.email && attrs.email !== user.email) {
            const existingUser = await this.userRepo.findOne({ where: { email: attrs.email } });
            if (existingUser) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        if (attrs.password) {
            const saltRounds = this.configService.get('SALT_ROUNDS') || '10';
            attrs.password = await bcrypt.hash(attrs.password, Number(saltRounds));
        }
        Object.assign(user, attrs);
        return this.userRepo.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map