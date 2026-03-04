import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDeliveryTables1772580000000 implements MigrationInterface {
    name = 'CreateDeliveryTables1772580000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create state table
        await queryRunner.createTable(new Table({
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

        // Create municipality table
        await queryRunner.createTable(new Table({
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

        // Add foreign keys
        await queryRunner.createForeignKey('state', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delivery_company',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('municipality', new TableForeignKey({
            columnNames: ['stateId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'state',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('municipality', true);
        await queryRunner.dropTable('state', true);
    }
}
