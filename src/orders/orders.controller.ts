import { IsNumber } from 'class-validator';
// src/orders/orders.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './orsers.service';
import { AddOrderDto } from './dtos/add-order.dto';
import { Order } from './entities/order.entity';

import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RejectOrderDto } from './dtos/reject-order.dto';
import { OrderPaginationDto } from './dtos/order-pagination.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { UpdateTrackingDto } from './dtos/update-tracking.dto';
import { Patch } from '@nestjs/common';
import { TrackOrderDto } from './dtos/track-order.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  @Roles(Role.ADMIN)
  getOrdersWithPagination(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderService.getOrdersWithPagination(orderPaginationDto);
  }
  @Post()
  async addOrder(@Body() dto: AddOrderDto): Promise<Order> {
    return this.orderService.addOrder(dto);
  }

  @Post('accept/:id')
  @Auth(Role.ADMIN)
  async acceptOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.acceptOrder(id);
  }

  @Post('reject/:id')
  @Auth(Role.ADMIN)
  async rejectOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejectOrderDto,
  ) {
    return this.orderService.rejectOrder(id, dto);
  }
  @Get()
  @Auth(Role.ADMIN)
  getOrders() {
    return this.orderService.getOrders();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrder(id);
  }

  @Post('track')
  async trackOrder(@Body() dto: TrackOrderDto) {
    console.log('Tracking order:', dto);
    try {
      return await this.orderService.trackOrder(dto.orderId, dto.email);
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }

  @Get('my-orders/list')
  @UseGuards(JwtAuthGuard)
  async getMyOrders(@CurrentUser() user: JwtPayload) {
    console.log('Getting my orders for user:', user);
    try {
      return await this.orderService.getMyOrders(user.email);
    } catch (error) {
      console.error('Error getting my orders:', error);
      throw error;
    }
  }

  @Patch(':id/tracking')
  @Auth(Role.ADMIN)
  async updateTracking(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTrackingDto,
  ) {
    return this.orderService.updateTracking(id, dto);
  }

  @Post(':id/reject-user')
  @UseGuards(JwtAuthGuard)
  async rejectOrderByUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.rejectOrderByUser(id, user.email);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
