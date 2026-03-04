import { OrderStatus } from '../enums/order-status.enum';
export declare class OrderPaginationDto {
    limit?: number;
    page?: number;
    status?: OrderStatus;
}
