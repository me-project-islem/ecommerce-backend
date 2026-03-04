import { Repository } from 'typeorm';
import { DeliveryCompany } from './entities/DeliveryCompany.entity';
import { State } from './entities/State.entity';
import { Municipality } from './entities/Municipality.entity';
export declare class DeliveryService {
    private companyRepo;
    private stateRepo;
    private municipalityRepo;
    constructor(companyRepo: Repository<DeliveryCompany>, stateRepo: Repository<State>, municipalityRepo: Repository<Municipality>);
    getAllDeliveryData(): Promise<DeliveryCompany[]>;
    createCompany(name: string): Promise<DeliveryCompany>;
    addState(companyId: number, name: string): Promise<State>;
    addMunicipality(stateId: number, name: string, homePrice: number, officePrice: number): Promise<Municipality>;
    updateMunicipality(id: number, data: Partial<Municipality>): Promise<Municipality | null>;
    deleteCompany(id: number): Promise<import("typeorm").DeleteResult>;
    deleteState(id: number): Promise<import("typeorm").DeleteResult>;
    deleteMunicipality(id: number): Promise<import("typeorm").DeleteResult>;
}
