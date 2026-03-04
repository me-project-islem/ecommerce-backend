import { OrderStatus } from '../enums/order-status.enum';
export declare class RejectOrderDto {
    status: OrderStatus.REJECTED_BY_ADMIN | OrderStatus.REJECTED_BY_USER;
}
