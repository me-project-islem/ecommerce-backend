import { OrderService } from './orsers.service';
import { AddOrderDto } from './dtos/add-order.dto';
import { Order } from './entities/order.entity';
import { RejectOrderDto } from './dtos/reject-order.dto';
import { OrderPaginationDto } from './dtos/order-pagination.dto';
import { UpdateTrackingDto } from './dtos/update-tracking.dto';
import { TrackOrderDto } from './dtos/track-order.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrdersWithPagination(orderPaginationDto: OrderPaginationDto): Promise<{
        data: Order[];
        total: number;
        totalQuery: number;
    }>;
    addOrder(dto: AddOrderDto): Promise<Order>;
    acceptOrder(id: number): Promise<Order>;
    rejectOrder(id: number, dto: RejectOrderDto): Promise<Order | null>;
    getOrders(): Promise<Order[]>;
    getOrder(id: number): Promise<Order>;
    trackOrder(dto: TrackOrderDto): Promise<Order>;
    getMyOrders(user: JwtPayload): Promise<Order[]>;
    updateTracking(id: number, dto: UpdateTrackingDto): Promise<Order>;
    rejectOrderByUser(id: number, user: JwtPayload): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
