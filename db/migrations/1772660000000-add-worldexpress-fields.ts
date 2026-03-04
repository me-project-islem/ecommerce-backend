import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddWorldExpressFields1772660000000 implements MigrationInterface {
    name = 'AddWorldExpressFields1772660000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add worldExpressWilayaId column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "worldExpressWilayaId",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add worldExpressCommuneId column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "worldExpressCommuneId",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add worldExpressWilayaName column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "worldExpressWilayaName",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add worldExpressCommuneName column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "worldExpressCommuneName",
                type: "character varying",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "worldExpressCommuneName");
        await queryRunner.dropColumn("order", "worldExpressWilayaName");
        await queryRunner.dropColumn("order", "worldExpressCommuneId");
        await queryRunner.dropColumn("order", "worldExpressWilayaId");
    }
}
