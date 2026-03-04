import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product-dto';
import { AddImagesDto } from './dtos/add-image.dto';
import { DeleteImagesDto } from './dtos/delete-image.dto';
import { PaginationDto } from './dtos/pagination.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductsWithPagination(paginationDto: PaginationDto): Promise<{
        data: import("./entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        message: string;
    }>;
    findOne(id: number): Promise<import("./entities/product.entity").Product>;
    create(body: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    update(id: number, body: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    addImages(id: number, dto: AddImagesDto): Promise<{
        id: number;
        url: string;
    }[]>;
    deleteImages(id: number, dto: DeleteImagesDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
}
