import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddZrexpressFields1772555700000 implements MigrationInterface {
    name = 'AddZrexpressFields1772555700000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add deliveryProvider column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "deliveryProvider",
                type: "character varying",
                isNullable: true,
                default: "'local'",
            })
        );

        // Add zrexpressWilayaId column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressWilayaId",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add zrexpressCommuneId column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressCommuneId",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add zrexpressWilayaName column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressWilayaName",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add zrexpressCommuneName column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressCommuneName",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add zrexpressParcelId column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressParcelId",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add zrexpressTrackingNumber column
        await queryRunner.addColumn(
            "order",
            new TableColumn({
                name: "zrexpressTrackingNumber",
                type: "character varying",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "zrexpressTrackingNumber");
        await queryRunner.dropColumn("order", "zrexpressParcelId");
        await queryRunner.dropColumn("order", "zrexpressCommuneName");
        await queryRunner.dropColumn("order", "zrexpressWilayaName");
        await queryRunner.dropColumn("order", "zrexpressCommuneId");
        await queryRunner.dropColumn("order", "zrexpressWilayaId");
        await queryRunner.dropColumn("order", "deliveryProvider");
    }
}
