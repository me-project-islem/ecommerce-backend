"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddZrexpressFields1772555700000 = void 0;
const typeorm_1 = require("typeorm");
class AddZrexpressFields1772555700000 {
    name = 'AddZrexpressFields1772555700000';
    async up(queryRunner) {
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "deliveryProvider",
            type: "character varying",
            isNullable: true,
            default: "'local'",
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressWilayaId",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressCommuneId",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressWilayaName",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressCommuneName",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressParcelId",
            type: "character varying",
            isNullable: true,
        }));
        await queryRunner.addColumn("order", new typeorm_1.TableColumn({
            name: "zrexpressTrackingNumber",
            type: "character varying",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("order", "zrexpressTrackingNumber");
        await queryRunner.dropColumn("order", "zrexpressParcelId");
        await queryRunner.dropColumn("order", "zrexpressCommuneName");
        await queryRunner.dropColumn("order", "zrexpressWilayaName");
        await queryRunner.dropColumn("order", "zrexpressCommuneId");
        await queryRunner.dropColumn("order", "zrexpressWilayaId");
        await queryRunner.dropColumn("order", "deliveryProvider");
    }
}
exports.AddZrexpressFields1772555700000 = AddZrexpressFields1772555700000;
//# sourceMappingURL=1772555700000-add-zrexpress-fields.js.map