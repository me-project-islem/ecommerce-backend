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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const delivery_type_enum_1 = require("../enums/delivery-type.enum");
class OrderItemDto {
    productId;
    quantity;
}
__decorate([
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_2.IsNumber)(),
    (0, class_validator_2.Min)(1),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
class AddOrderDto {
    items;
    withDelivery;
    deliveryPrice;
    state;
    municipality;
    deliveryCompanyId;
    deliveryType;
    deliveryProvider;
    zrexpressWilayaId;
    zrexpressCommuneId;
    zrexpressWilayaName;
    zrexpressCommuneName;
    zrexpressParcelId;
    zrexpressTrackingNumber;
    firstName;
    familyName;
    email;
    phoneNumbers;
}
exports.AddOrderDto = AddOrderDto;
__decorate([
    (0, class_validator_2.IsArray)(),
    (0, class_validator_2.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], AddOrderDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_2.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddOrderDto.prototype, "withDelivery", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], AddOrderDto.prototype, "deliveryPrice", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "municipality", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], AddOrderDto.prototype, "deliveryCompanyId", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "deliveryType", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "deliveryProvider", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressWilayaId", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressCommuneId", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressWilayaName", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressCommuneName", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressParcelId", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "zrexpressTrackingNumber", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "familyName", void 0);
__decorate([
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !!o.email),
    (0, class_validator_2.IsEmail)(),
    __metadata("design:type", String)
], AddOrderDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_2.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AddOrderDto.prototype, "phoneNumbers", void 0);
//# sourceMappingURL=add-order.dto.js.map