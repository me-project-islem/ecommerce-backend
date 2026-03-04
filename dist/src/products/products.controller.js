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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dtos/create-product.dto");
const update_product_dto_1 = require("./dtos/update-product-dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const role_enum_1 = require("../common/enums/role.enum");
const add_image_dto_1 = require("./dtos/add-image.dto");
const delete_image_dto_1 = require("./dtos/delete-image.dto");
const pagination_dto_1 = require("./dtos/pagination.dto");
const auth_decorator_1 = require("../common/decorators/auth.decorator");
let ProductsController = class ProductsController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    getProductsWithPagination(paginationDto) {
        return this.productService.getProductsWithPagination(paginationDto);
    }
    findOne(id) {
        return this.productService.findOne(id);
    }
    create(body) {
        return this.productService.create(body);
    }
    update(id, body) {
        return this.productService.update(id, body);
    }
    addImages(id, dto) {
        return this.productService.addImages(id, dto.imageUrls);
    }
    deleteImages(id, dto) {
        return this.productService.deleteImages(id, dto.imageIds);
    }
    delete(id) {
        return this.productService.delete(id);
    }
    findAll() {
        return this.productService.findAll();
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductsWithPagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    (0, common_1.Post)('images/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_image_dto_1.AddImagesDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addImages", null);
__decorate([
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    (0, common_1.Delete)('images/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_image_dto_1.DeleteImagesDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteImages", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, auth_decorator_1.Auth)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map