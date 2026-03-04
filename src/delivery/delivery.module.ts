import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryCompany } from './entities/DeliveryCompany.entity';
import { State } from './entities/State.entity';
import { Municipality } from './entities/Municipality.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryCompany, State, Municipality])],
    controllers: [DeliveryController],
    providers: [DeliveryService],
    exports: [DeliveryService],
})
export class DeliveryModule { }
