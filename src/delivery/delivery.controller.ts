import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Get()
    getAll() {
        return this.deliveryService.getAllDeliveryData();
    }

    @Post('company')
    createCompany(@Body('name') name: string) {
        return this.deliveryService.createCompany(name);
    }

    @Post('state')
    addState(@Body() body: { companyId: number; name: string }) {
        return this.deliveryService.addState(body.companyId, body.name);
    }

    @Post('municipality')
    addMunicipality(@Body() body: { stateId: number; name: string; homePrice: number; officePrice: number }) {
        return this.deliveryService.addMunicipality(body.stateId, body.name, body.homePrice, body.officePrice);
    }

    @Put('municipality/:id')
    updateMunicipality(@Param('id') id: number, @Body() body: any) {
        return this.deliveryService.updateMunicipality(id, body);
    }

    @Delete('company/:id')
    deleteCompany(@Param('id') id: number) {
        return this.deliveryService.deleteCompany(id);
    }

    @Delete('state/:id')
    deleteState(@Param('id') id: number) {
        return this.deliveryService.deleteState(id);
    }

    @Delete('municipality/:id')
    deleteMunicipality(@Param('id') id: number) {
        return this.deliveryService.deleteMunicipality(id);
    }
}
