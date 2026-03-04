"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingOrderColumns1765318820692 = void 0;
class AddMissingOrderColumns1765318820692 {
    name = 'AddMissingOrderColumns1765318820692';
    async up(queryRunner) {
        const orderColumns = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'order' AND column_name IN ('deliveryNotes', 'shippedAt', 'deliveredAt', 'statusHistory')
        `);
        const existingColumns = orderColumns.map((col) => col.column_name);
        if (!existingColumns.includes('deliveryNotes')) {
            await queryRunner.query(`ALTER TABLE "order" ADD "deliveryNotes" text`);
        }
        if (!existingColumns.includes('shippedAt')) {
            await queryRunner.query(`ALTER TABLE "order" ADD "shippedAt" TIMESTAMP`);
        }
        if (!existingColumns.includes('deliveredAt')) {
            await queryRunner.query(`ALTER TABLE "order" ADD "deliveredAt" TIMESTAMP`);
        }
        if (!existingColumns.includes('statusHistory')) {
            await queryRunner.query(`ALTER TABLE "order" ADD "statusHistory" text`);
        }
        const enumExists = await queryRunner.query(`
            SELECT typname FROM pg_type WHERE typname = 'order_status_enum'
        `);
        if (enumExists.length > 0) {
            await queryRunner.query(`ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`);
            await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('waiting', 'confirmed', 'rejected_by_admin', 'rejected_by_user', 'shipped', 'delivered')`);
            await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
            await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"`);
            await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'waiting'`);
            await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "statusHistory"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deliveredAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shippedAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deliveryNotes"`);
    }
}
exports.AddMissingOrderColumns1765318820692 = AddMissingOrderColumns1765318820692;
//# sourceMappingURL=1765318820692-AddMissingOrderColumns.js.map