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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../categorys/entities/category.entity");
const productImages_entity_1 = require("./entities/productImages.entity");
let ProductService = class ProductService {
    productRepository;
    categoryRepository;
    productImageRepository;
    constructor(productRepository, categoryRepository, productImageRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productImageRepository = productImageRepository;
    }
    async create(body) {
        const category = await this.categoryRepository.findOne({
            where: { id: body.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${body.categoryId} not found`);
        }
        const existingProduct = await this.productRepository.findOne({
            where: {
                name: body.name,
                category: { id: body.categoryId },
            },
            relations: ['category'],
        });
        if (existingProduct) {
            throw new common_1.ConflictException(`Product with name "${body.name}" already exists in this category.`);
        }
        const product = this.productRepository.create({
            name: body.name,
            price: body.price,
            description: body.description,
            stock: body.stock,
            category,
            images: (body.imageUrl ?? []).map((url) => ({ url })),
        });
        return await this.productRepository.save(product);
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'images'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`No product with this id: ${id}`);
        }
        return product;
    }
    async find() {
        const products = await this.productRepository.find({
            relations: ['category', 'images'],
            where: { isDeleted: false },
        });
        return products;
    }
    async findAll() {
        const products = await this.productRepository.find({
            relations: ['category', 'images'],
        });
        return products;
    }
    async update(id, dto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'images'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (dto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: dto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID ${dto.categoryId} not found`);
            }
            product.category = category;
        }
        Object.assign(product, {
            name: dto.name ?? product.name,
            description: dto.description ?? product.description,
            price: dto.price ?? product.price,
            stock: dto.stock ?? product.stock,
        });
        return await this.productRepository.save(product);
    }
    async addImages(productId, imageUrls) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const newImages = imageUrls.map((url) => {
            const image = new productImages_entity_1.productImage();
            image.url = url;
            image.product = product;
            return image;
        });
        if (newImages.length === 0) {
            throw new common_1.ConflictException('No images provided to add');
        }
        return (await this.productImageRepository.save(newImages)).map((image) => ({
            id: image.id,
            url: image.url,
        }));
    }
    async deleteImages(productId, imageIds) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['images'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (imageIds && imageIds.length > 0) {
            const validImageIds = product.images
                .filter((image) => imageIds.includes(image.id))
                .map((image) => image.id);
            if (validImageIds.length === 0) {
                throw new common_1.NotFoundException(`No matching images found for product ${productId}`);
            }
            await this.productImageRepository.delete(validImageIds);
            return {
                message: `Deleted ${validImageIds.length} image(s) for product ${productId}`,
            };
        }
        else {
            await this.productImageRepository.delete({ product: { id: productId } });
            return { message: `All images deleted for product ${productId}` };
        }
    }
    async getProductsWithPagination(paginationDto) {
        const { page = 1, limit = 10, categoryId, search } = paginationDto;
        const take = +limit;
        const skip = (+page - 1) * take;
        const queryBuilder = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.images', 'images')
            .where('product.isDeleted = :isDeleted', { isDeleted: false })
            .skip(skip)
            .take(take);
        if (categoryId) {
            queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
        }
        if (search) {
            queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
                search: `%${search}%`,
            });
        }
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            total,
            page: +page,
            limit: take,
            message: 'Products fetched successfully',
        };
    }
    async delete(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productRepository.update(id, { isDeleted: true });
        return { message: `Product with ID ${id} deleted successfully` };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(productImages_entity_1.productImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map