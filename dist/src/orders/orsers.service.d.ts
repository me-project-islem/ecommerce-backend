import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { AddOrderDto } from './dtos/add-order.dto';
import { Product } from '../products/entities/product.entity';
import { DeliveryCompany } from '../delivery/entities/DeliveryCompany.entity';
import { RejectOrderDto } from './dtos/reject-order.dto';
import { OrderPaginationDto } from './dtos/order-pagination.dto';
import { UpdateTrackingDto } from './dtos/update-tracking.dto';
export declare class OrderService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly productRepo;
    private readonly deliveryCompanyRepo;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, productRepo: Repository<Product>, deliveryCompanyRepo: Repository<DeliveryCompany>);
    addOrder(dto: AddOrderDto): Promise<Order>;
    checkOrderStatus(order: Order | null): boolean;
    acceptOrder(id: number): Promise<Order>;
    rejectOrder(id: number, dto: RejectOrderDto): Promise<Order | null>;
    getOrders(): Promise<Order[]>;
    getOrder(id: number): Promise<Order>;
    getOrdersWithPagination(dto: OrderPaginationDto): Promise<{
        data: Order[];
        total: number;
        totalQuery: number;
    }>;
    updateTracking(id: number, dto: UpdateTrackingDto): Promise<Order>;
    trackOrder(orderId: number, email: string): Promise<Order>;
    getMyOrders(email: string): Promise<Order[]>;
    rejectOrderByUser(id: number, email: string): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
