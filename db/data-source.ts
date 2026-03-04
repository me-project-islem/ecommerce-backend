import { Category } from '../src/categorys/entities/category.entity';
import { Product } from '../src/products/entities/product.entity';
import { productImage } from '../src/products/entities/productImages.entity';
import { User } from '../src/auth/entities/user.entity';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Order } from '../src/orders/entities/order.entity';
import { OrderItem } from '../src/orders/entities/order-item.entity';
import { DeliveryCompany } from '../src/delivery/entities/DeliveryCompany.entity';
import { State } from '../src/delivery/entities/State.entity';
import { Municipality } from '../src/delivery/entities/Municipality.entity';
config({ path: '.env' });
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // Enable SSL for all remote databases, disable only for localhost
  ssl: process.env.DATABASE_URL?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
  entities: [
    Product,
    Category,
    productImage,
    User,
    Order,
    OrderItem,
    DeliveryCompany,
    State,
    Municipality,
  ],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false, // Disabled in production for safety (tables already created)
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
