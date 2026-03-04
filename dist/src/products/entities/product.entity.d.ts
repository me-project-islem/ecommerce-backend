import { Category } from '../../categorys/entities/category.entity';
import { productImage } from '../entities/productImages.entity';
export declare class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Category;
    images: productImage[];
    stock: number;
    isDeleted: boolean;
}
