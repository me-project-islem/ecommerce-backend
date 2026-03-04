import { DeliveryService } from './delivery.service';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    getAll(): Promise<import("./entities/DeliveryCompany.entity").DeliveryCompany[]>;
    createCompany(name: string): Promise<import("./entities/DeliveryCompany.entity").DeliveryCompany>;
    addState(body: {
        companyId: number;
        name: string;
    }): Promise<import("./entities/State.entity").State>;
    addMunicipality(body: {
        stateId: number;
        name: string;
        homePrice: number;
        officePrice: number;
    }): Promise<import("./entities/Municipality.entity").Municipality>;
    updateMunicipality(id: number, body: any): Promise<import("./entities/Municipality.entity").Municipality | null>;
    deleteCompany(id: number): Promise<import("typeorm").DeleteResult>;
    deleteState(id: number): Promise<import("typeorm").DeleteResult>;
    deleteMunicipality(id: number): Promise<import("typeorm").DeleteResult>;
}
