import { CreateProductDto } from './dtos/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categorys/entities/category.entity';
import { productImage } from './entities/productImages.entity';
import { UpdateProductDto } from './dtos/update-product-dto';
import { PaginationDto } from './dtos/pagination.dto';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    private readonly productImageRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, productImageRepository: Repository<productImage>);
    create(body: CreateProductDto): Promise<Product>;
    findOne(id: number): Promise<Product>;
    find(): Promise<Product[]>;
    findAll(): Promise<Product[]>;
    update(id: number, dto: UpdateProductDto): Promise<Product>;
    addImages(productId: number, imageUrls: string[]): Promise<{
        id: number;
        url: string;
    }[]>;
    deleteImages(productId: number, imageIds?: number[]): Promise<{
        message: string;
    }>;
    getProductsWithPagination(paginationDto: PaginationDto): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
