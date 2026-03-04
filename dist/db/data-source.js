"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const category_entity_1 = require("../src/categorys/entities/category.entity");
const product_entity_1 = require("../src/products/entities/product.entity");
const productImages_entity_1 = require("../src/products/entities/productImages.entity");
const user_entity_1 = require("../src/auth/entities/user.entity");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../src/orders/entities/order.entity");
const order_item_entity_1 = require("../src/orders/entities/order-item.entity");
const DeliveryCompany_entity_1 = require("../src/delivery/entities/DeliveryCompany.entity");
const State_entity_1 = require("../src/delivery/entities/State.entity");
const Municipality_entity_1 = require("../src/delivery/entities/Municipality.entity");
(0, dotenv_1.config)({ path: '.env' });
exports.dataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost')
        ? false
        : { rejectUnauthorized: false },
    entities: [
        product_entity_1.Product,
        category_entity_1.Category,
        productImages_entity_1.productImage,
        user_entity_1.User,
        order_entity_1.Order,
        order_item_entity_1.OrderItem,
        DeliveryCompany_entity_1.DeliveryCompany,
        State_entity_1.State,
        Municipality_entity_1.Municipality,
    ],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
};
const AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map