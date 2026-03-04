"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorldExpressFields1772660000000 = void 0;
const typeorm_1 = require("typeorm");
class AddWorldExpressFields1772660000000 {
    name = 'AddWorldExpressFields1772660000000';
    async up(queryRunner) {
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "worldExpressWilayaId",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "worldExpressCommuneId",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "worldExpressWilayaName",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "worldExpressCommuneName",
            type: "character varying",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("order", "worldExpressCommuneName");
        await queryRunner.dropColumn("order", "worldExpressWilayaName");
        await queryRunner.dropColumn("order", "worldExpressCommuneId");
        await queryRunner.dropColumn("order", "worldExpressWilayaId");
    }
}
exports.AddWorldExpressFields1772660000000 = AddWorldExpressFields1772660000000;
//# sourceMappingURL=1772660000000-add-worldexpress-fields.js.map