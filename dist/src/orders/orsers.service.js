"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const DeliveryCompany_entity_1 = require("../delivery/entities/DeliveryCompany.entity");
const order_status_enum_1 = require("./enums/order-status.enum");
let OrderService = class OrderService {
    orderRepo;
    orderItemRepo;
    productRepo;
    deliveryCompanyRepo;
    constructor(orderRepo, orderItemRepo, productRepo, deliveryCompanyRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.productRepo = productRepo;
        this.deliveryCompanyRepo = deliveryCompanyRepo;
    }
    async addOrder(dto) {
        const orderItems = [];
        let calculatedProductsTotal = 0;
        let total = 0;
        for (const item of dto.items) {
            const product = await this.productRepo.findOne({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.productId} not found`);
            }
            total += product.price;
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Not enough stock for product: ${product.name}`);
            }
            const orderItem = this.orderItemRepo.create({
                product,
                quantity: item.quantity,
            });
            orderItems.push(orderItem);
            calculatedProductsTotal += +product.price * item.quantity;
        }
        let deliveryCompany = undefined;
        if (dto.withDelivery && dto.deliveryCompanyId) {
            const foundDeliveryCompany = await this.deliveryCompanyRepo.findOne({
                where: { id: dto.deliveryCompanyId },
            });
            if (!foundDeliveryCompany) {
                throw new common_1.NotFoundException('Delivery company not found');
            }
            deliveryCompany = foundDeliveryCompany;
        }
        const order = this.orderRepo.create({
            items: orderItems,
            productsTotal: calculatedProductsTotal,
            total: calculatedProductsTotal + (dto.deliveryPrice ?? 0),
            withDelivery: dto.withDelivery,
            deliveryPrice: dto.deliveryPrice,
            state: dto.state,
            municipality: dto.municipality,
            deliveryCompany,
            firstName: dto.firstName,
            familyName: dto.familyName,
            email: dto.email,
            phoneNumbers: dto.phoneNumbers,
            deliveryType: dto.deliveryType,
            deliveryProvider: dto.deliveryProvider || 'local',
            zrexpressWilayaId: dto.zrexpressWilayaId,
            zrexpressCommuneId: dto.zrexpressCommuneId,
            zrexpressWilayaName: dto.zrexpressWilayaName,
            zrexpressCommuneName: dto.zrexpressCommuneName,
            zrexpressParcelId: dto.zrexpressParcelId,
            zrexpressTrackingNumber: dto.zrexpressTrackingNumber,
            worldExpressWilayaId: dto.worldExpressWilayaId,
            worldExpressCommuneId: dto.worldExpressCommuneId,
            worldExpressWilayaName: dto.worldExpressWilayaName,
            worldExpressCommuneName: dto.worldExpressCommuneName,
            statusHistory: [
                {
                    status: order_status_enum_1.OrderStatus.WAITING,
                    timestamp: new Date(),
                    note: 'Order placed',
                },
            ],
        });
        const savedOrder = await this.orderRepo.save(order);
        for (const item of orderItems) {
            item.product.stock -= item.quantity;
            await this.productRepo.save(item.product);
        }
        return savedOrder;
    }
    checkOrderStatus(order) {
        if (!order)
            throw new common_1.NotFoundException('Order Not Found');
        if (order.confirmedAt ||
            order.status !== order_status_enum_1.OrderStatus.WAITING ||
            order.rejectedAt)
            throw new common_1.BadRequestException('Order already confirmed or rejected');
        return true;
    }
    async acceptOrder(id) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        this.checkOrderStatus(order);
        order.status = order_status_enum_1.OrderStatus.CONFIRMED;
        order.confirmedAt = new Date();
        if (!order.statusHistory) {
            order.statusHistory = [];
        }
        order.statusHistory.push({
            status: order_status_enum_1.OrderStatus.CONFIRMED,
            timestamp: new Date(),
            note: 'Order confirmed by admin',
        });
        return this.orderRepo.save(order);
    }
    async rejectOrder(id, dto) {
        const order = await this.orderRepo.findOne({
            where: { id: id },
            relations: ['items', 'items.product', 'deliveryCompany', 'items.order'],
        });
        if (!order) {
            throw new common_1.NotFoundException('order not found ');
        }
        this.checkOrderStatus(order);
        const orderItems = order.items;
        for (const item of orderItems) {
            const product = await this.productRepo.findOne({
                where: { id: item.product.id },
            });
            if (product && typeof product.stock === 'number') {
                product.stock += item.quantity;
                await this.productRepo.save(product);
            }
        }
        order.rejectedAt = new Date();
        order.status = dto.status;
        if (!order.statusHistory) {
            order.statusHistory = [];
        }
        order.statusHistory.push({
            status: dto.status,
            timestamp: new Date(),
            note: 'Order rejected by admin',
        });
        await this.orderRepo.save(order);
        return this.orderRepo.findOne({
            where: { id: order.id },
            relations: [
                'items.product.images',
                'items.product.category',
                'deliveryCompany',
            ],
        });
    }
    async getOrders() {
        return await this.orderRepo.find({
            relations: ['items', 'deliveryCompany'],
        });
    }
    async getOrder(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.product', 'deliveryCompany'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async getOrdersWithPagination(dto) {
        const { limit = 10, page = 1, status } = dto;
        const where = status ? { status } : {};
        const [data, totalQuery] = await this.orderRepo.findAndCount({
            where,
            relations: [
                'items.product.images',
                'items.product.category',
                'deliveryCompany',
            ],
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
        });
        const total = await this.orderRepo.count();
        return { data, total, totalQuery };
    }
    async updateTracking(id, dto) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (dto.trackingNumber) {
            order.trackingNumber = dto.trackingNumber;
        }
        if (dto.deliveryNotes) {
            order.deliveryNotes = dto.deliveryNotes;
        }
        if (dto.status) {
            const previousStatus = order.status;
            order.status = dto.status;
            if (dto.status === order_status_enum_1.OrderStatus.SHIPPED) {
                order.shippedAt = new Date();
            }
            else if (dto.status === order_status_enum_1.OrderStatus.DELIVERED) {
                order.deliveredAt = new Date();
            }
            if (!order.statusHistory) {
                order.statusHistory = [];
            }
            let statusNote = '';
            if (dto.status === order_status_enum_1.OrderStatus.SHIPPED) {
                statusNote = dto.trackingNumber ? `Shipped with tracking: ${dto.trackingNumber}` : 'Order shipped';
            }
            else if (dto.status === order_status_enum_1.OrderStatus.DELIVERED) {
                statusNote = 'Order delivered';
            }
            else {
                statusNote = `Status changed to ${dto.status}`;
            }
            order.statusHistory.push({
                status: dto.status,
                timestamp: new Date(),
                note: statusNote,
            });
        }
        return await this.orderRepo.save(order);
    }
    async trackOrder(orderId, email) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId, email },
            relations: ['items', 'items.product', 'deliveryCompany'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found with provided details');
        }
        return order;
    }
    async getMyOrders(email) {
        return await this.orderRepo.find({
            where: { email },
            relations: ['items', 'items.product', 'deliveryCompany'],
            order: { createdAt: 'DESC' },
        });
    }
    async rejectOrderByUser(id, email) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.email !== email) {
            throw new common_1.ForbiddenException('You are not allowed to reject this order');
        }
        if (order.status !== order_status_enum_1.OrderStatus.WAITING) {
            throw new common_1.BadRequestException('Only waiting orders can be rejected');
        }
        for (const item of order.items) {
            item.product.stock += item.quantity;
            await this.productRepo.save(item.product);
        }
        order.status = order_status_enum_1.OrderStatus.REJECTED_BY_USER;
        const historyEntry = {
            status: order_status_enum_1.OrderStatus.REJECTED_BY_USER,
            timestamp: new Date(),
            note: 'Order rejected by user',
        };
        const currentHistory = order.statusHistory || [];
        order.statusHistory = [...currentHistory, historyEntry];
        return await this.orderRepo.save(order);
    }
    async deleteOrder(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        for (const item of order.items) {
            if (item.product) {
                item.product.stock += item.quantity;
                await this.productRepo.save(item.product);
            }
        }
        await this.orderRepo.delete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(DeliveryCompany_entity_1.DeliveryCompany)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=orsers.service.js.map