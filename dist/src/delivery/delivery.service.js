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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const DeliveryCompany_entity_1 = require("./entities/DeliveryCompany.entity");
const State_entity_1 = require("./entities/State.entity");
const Municipality_entity_1 = require("./entities/Municipality.entity");
let DeliveryService = class DeliveryService {
    companyRepo;
    stateRepo;
    municipalityRepo;
    constructor(companyRepo, stateRepo, municipalityRepo) {
        this.companyRepo = companyRepo;
        this.stateRepo = stateRepo;
        this.municipalityRepo = municipalityRepo;
    }
    async getAllDeliveryData() {
        return this.companyRepo.find({
            relations: ['states', 'states.municipalities'],
            order: {
                id: 'ASC',
                states: {
                    id: 'ASC',
                    municipalities: {
                        id: 'ASC',
                    },
                },
            },
        });
    }
    async createCompany(name) {
        const company = this.companyRepo.create({ name });
        return this.companyRepo.save(company);
    }
    async addState(companyId, name) {
        const company = await this.companyRepo.findOne({ where: { id: companyId } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        const state = this.stateRepo.create({ name, company });
        return this.stateRepo.save(state);
    }
    async addMunicipality(stateId, name, homePrice, officePrice) {
        const state = await this.stateRepo.findOne({ where: { id: stateId } });
        if (!state)
            throw new common_1.NotFoundException('State not found');
        const municipality = this.municipalityRepo.create({
            name,
            homePrice,
            officePrice,
            state,
        });
        return this.municipalityRepo.save(municipality);
    }
    async updateMunicipality(id, data) {
        await this.municipalityRepo.update(id, data);
        return this.municipalityRepo.findOne({ where: { id } });
    }
    async deleteCompany(id) {
        return this.companyRepo.delete(id);
    }
    async deleteState(id) {
        return this.stateRepo.delete(id);
    }
    async deleteMunicipality(id) {
        return this.municipalityRepo.delete(id);
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(DeliveryCompany_entity_1.DeliveryCompany)),
    __param(1, (0, typeorm_1.InjectRepository)(State_entity_1.State)),
    __param(2, (0, typeorm_1.InjectRepository)(Municipality_entity_1.Municipality)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DeliveryService);
//# sourceMappingURL=delivery.service.js.map