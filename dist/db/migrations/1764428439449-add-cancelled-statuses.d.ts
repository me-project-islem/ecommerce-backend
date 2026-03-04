import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddCancelledStatuses1764428439449 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
