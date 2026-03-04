import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateDeliveryTables1772580000000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
