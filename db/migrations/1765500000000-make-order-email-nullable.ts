import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeOrderEmailNullable1765500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "email" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "order" SET "email" = '' WHERE "email" IS NULL`);
    await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "email" SET NOT NULL`);
  }
}
