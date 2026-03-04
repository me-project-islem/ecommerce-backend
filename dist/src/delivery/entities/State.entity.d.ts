import { DeliveryCompany } from './DeliveryCompany.entity';
import { Municipality } from './Municipality.entity';
export declare class State {
    id: number;
    name: string;
    company: DeliveryCompany;
    municipalities: Municipality[];
}
