import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1751154391636 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
