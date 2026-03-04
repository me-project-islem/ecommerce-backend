import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryCompany } from './entities/DeliveryCompany.entity';
import { State } from './entities/State.entity';
import { Municipality } from './entities/Municipality.entity';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(DeliveryCompany)
        private companyRepo: Repository<DeliveryCompany>,
        @InjectRepository(State)
        private stateRepo: Repository<State>,
        @InjectRepository(Municipality)
        private municipalityRepo: Repository<Municipality>,
    ) { }

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

    async createCompany(name: string) {
        const company = this.companyRepo.create({ name });
        return this.companyRepo.save(company);
    }

    async addState(companyId: number, name: string) {
        const company = await this.companyRepo.findOne({ where: { id: companyId } });
        if (!company) throw new NotFoundException('Company not found');

        const state = this.stateRepo.create({ name, company });
        return this.stateRepo.save(state);
    }

    async addMunicipality(stateId: number, name: string, homePrice: number, officePrice: number) {
        const state = await this.stateRepo.findOne({ where: { id: stateId } });
        if (!state) throw new NotFoundException('State not found');

        const municipality = this.municipalityRepo.create({
            name,
            homePrice,
            officePrice,
            state,
        });
        return this.municipalityRepo.save(municipality);
    }

    async updateMunicipality(id: number, data: Partial<Municipality>) {
        await this.municipalityRepo.update(id, data);
        return this.municipalityRepo.findOne({ where: { id } });
    }

    async deleteCompany(id: number) {
        return this.companyRepo.delete(id);
    }

    async deleteState(id: number) {
        return this.stateRepo.delete(id);
    }

    async deleteMunicipality(id: number) {
        return this.municipalityRepo.delete(id);
    }
}
