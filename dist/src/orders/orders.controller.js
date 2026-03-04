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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const orsers_service_1 = require("./orsers.service");
const add_order_dto_1 = require("./dtos/add-order.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const reject_order_dto_1 = require("./dtos/reject-order.dto");
const order_pagination_dto_1 = require("./dtos/order-pagination.dto");
const auth_decorator_1 = require("../common/decorators/auth.decorator");
const update_tracking_dto_1 = require("./dtos/update-tracking.dto");
const common_2 = require("@nestjs/common");
const track_order_dto_1 = require("./dtos/track-order.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrdersWithPagination(orderPaginationDto) {
        return this.orderService.getOrdersWithPagination(orderPaginationDto);
    }
    async addOrder(dto) {
        return this.orderService.addOrder(dto);
    }
    async acceptOrder(id) {
        return this.orderService.acceptOrder(id);
    }
    async rejectOrder(id, dto) {
        return this.orderService.rejectOrder(id, dto);
    }
    getOrders() {
        return this.orderService.getOrders();
    }
    getOrder(id) {
        return this.orderService.getOrder(id);
    }
    async trackOrder(dto) {
        console.log('Tracking order:', dto);
        try {
            return await this.orderService.trackOrder(dto.orderId, dto.email);
        }
        catch (error) {
            console.error('Error tracking order:', error);
            throw error;
        }
    }
    async getMyOrders(user) {
        console.log('Getting my orders for user:', user);
        try {
            return await this.orderService.getMyOrders(user.email);
        }
        catch (error) {
            console.error('Error getting my orders:', error);
            throw error;
        }
    }
    async updateTracking(id, dto) {
        return this.orderService.updateTracking(id, dto);
    }
    async rejectOrderByUser(id, user) {
        return this.orderService.rejectOrderByUser(id, user.email);
    }
    async deleteOrder(id) {
        return this.orderService.deleteOrder(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_pagination_dto_1.OrderPaginationDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrdersWithPagination", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_order_dto_1.AddOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    (0, common_1.Post)('accept/:id'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "acceptOrder", null);
__decorate([
    (0, common_1.Post)('reject/:id'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reject_order_dto_1.RejectOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "rejectOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)('track'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_order_dto_1.TrackOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "trackOrder", null);
__decorate([
    (0, common_1.Get)('my-orders/list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getMyOrders", null);
__decorate([
    (0, common_2.Patch)(':id/tracking'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tracking_dto_1.UpdateTrackingDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateTracking", null);
__decorate([
    (0, common_1.Post)(':id/reject-user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "rejectOrderByUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orsers_service_1.OrderService])
], OrderController);
//# sourceMappingURL=orders.controller.js.map