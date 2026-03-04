import { DeliveryType } from '../enums/delivery-type.enum';
declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class AddOrderDto {
    items: OrderItemDto[];
    withDelivery: boolean;
    deliveryPrice?: number;
    state?: string;
    municipality?: string;
    deliveryCompanyId?: number;
    deliveryType?: DeliveryType;
    deliveryProvider?: string;
    zrexpressWilayaId?: string;
    zrexpressCommuneId?: string;
    zrexpressWilayaName?: string;
    zrexpressCommuneName?: string;
    zrexpressParcelId?: string;
    zrexpressTrackingNumber?: string;
    worldExpressWilayaId?: string;
    worldExpressCommuneId?: string;
    worldExpressWilayaName?: string;
    worldExpressCommuneName?: string;
    firstName: string;
    familyName: string;
    email?: string;
    phoneNumbers: string[];
}
export {};
