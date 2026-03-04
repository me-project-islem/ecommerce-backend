import { OrderStatus } from '../enums/order-status.enum';
export declare class UpdateTrackingDto {
    trackingNumber?: string;
    status?: OrderStatus;
    deliveryNotes?: string;
}
