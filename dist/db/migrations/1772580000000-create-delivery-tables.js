"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryTables1772580000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateDeliveryTables1772580000000 {
    name = 'CreateDeliveryTables1772580000000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'state',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'character varying',
                },
                {
                    name: 'companyId',
                    type: 'integer',
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'municipality',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'character varying',
                },
                {
                    name: 'homePrice',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'officePrice',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'stateId',
                    type: 'integer',
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('state', new typeorm_1.TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delivery_company',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('municipality', new typeorm_1.TableForeignKey({
            columnNames: ['stateId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'state',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('municipality', true);
        await queryRunner.dropTable('state', true);
    }
}
exports.CreateDeliveryTables1772580000000 = CreateDeliveryTables1772580000000;
//# sourceMappingURL=1772580000000-create-delivery-tables.js.map