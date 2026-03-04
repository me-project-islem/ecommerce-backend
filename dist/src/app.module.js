"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const categorys_module_1 = require("./categorys/categorys.module");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const config_1 = require("@nestjs/config");
const orders_module_1 = require("./orders/orders.module");
const app_controller_1 = require("./app.controller");
const delivery_module_1 = require("./delivery/delivery.module");
const common_module_1 = require("./common/common.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            products_module_1.ProductsModule,
            categorys_module_1.CategoryModule,
            auth_module_1.AuthModule,
            orders_module_1.OrdersModule,
            delivery_module_1.DeliveryModule,
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            common_module_1.CommonModule,
        ],
        providers: [],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map