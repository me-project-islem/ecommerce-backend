import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddWorldExpressFields1772660000000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
