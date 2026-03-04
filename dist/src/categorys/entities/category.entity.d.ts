import { Product } from '../../products/entities/product.entity';
export declare class Category {
    id: number;
    name: string;
    image?: string;
    products: Product[];
}
