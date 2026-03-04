// src/orders/entities/order.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { DeliveryCompany } from '../../delivery/entities/DeliveryCompany.entity';
import { OrderItem } from './order-item.entity';
import { DeliveryType } from '../enums/delivery-type.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column('decimal')
  productsTotal: number;

  @Column('decimal')
  total: number;

  @Column({ default: false })
  withDelivery: boolean;

  @Column('decimal', { nullable: true })
  deliveryPrice?: number;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  municipality?: string;

  @ManyToOne(() => DeliveryCompany, { nullable: true })
  deliveryCompany?: DeliveryCompany;

  @Column({
    type: 'enum',
    enum: DeliveryType,
    nullable: true,
  })
  deliveryType?: DeliveryType;

  // ZREXPRESS Integration Fields
  @Column({ nullable: true, default: 'local' })
  deliveryProvider?: string; // 'local' | 'zrexpress'

  @Column({ nullable: true })
  zrexpressWilayaId?: string;

  @Column({ nullable: true })
  zrexpressCommuneId?: string;

  @Column({ nullable: true })
  zrexpressWilayaName?: string;

  @Column({ nullable: true })
  zrexpressCommuneName?: string;

  @Column({ nullable: true })
  zrexpressParcelId?: string;

  @Column({ nullable: true })
  zrexpressTrackingNumber?: string;

  // WORLD EXPRESS Integration Fields
  @Column({ nullable: true })
  worldExpressWilayaId?: string;

  @Column({ nullable: true })
  worldExpressCommuneId?: string;

  @Column({ nullable: true })
  worldExpressWilayaName?: string;

  @Column({ nullable: true })
  worldExpressCommuneName?: string;

  @Column()
  firstName: string;

  @Column()
  familyName: string;

  @Column({ nullable: true })
  email?: string;

  @Column('simple-array')
  phoneNumbers: string[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.WAITING,
  })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ nullable: true })
  trackingNumber?: string;

  @Column({ type: 'text', nullable: true })
  deliveryNotes?: string;

  @Column({ type: 'timestamp', nullable: true })
  shippedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt?: Date;

  @Column({ type: 'simple-json', nullable: true })
  statusHistory?: Array<{
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }>;
}
