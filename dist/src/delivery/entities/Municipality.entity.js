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
exports.Municipality = void 0;
const typeorm_1 = require("typeorm");
const State_entity_1 = require("./State.entity");
let Municipality = class Municipality {
    id;
    name;
    homePrice;
    officePrice;
    state;
};
exports.Municipality = Municipality;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Municipality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Municipality.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        }
    }),
    __metadata("design:type", Number)
], Municipality.prototype, "homePrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        }
    }),
    __metadata("design:type", Number)
], Municipality.prototype, "officePrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => State_entity_1.State, (state) => state.municipalities, { onDelete: 'CASCADE' }),
    __metadata("design:type", State_entity_1.State)
], Municipality.prototype, "state", void 0);
exports.Municipality = Municipality = __decorate([
    (0, typeorm_1.Entity)()
], Municipality);
//# sourceMappingURL=Municipality.entity.js.map