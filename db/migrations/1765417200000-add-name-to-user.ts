import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNameToUser1765417200000 implements MigrationInterface {
    name = 'AddNameToUser1765417200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "name",
                type: "character varying",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "name");
    }
}
