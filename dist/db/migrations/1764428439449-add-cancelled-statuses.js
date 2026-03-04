"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCancelledStatuses1764428439449 = void 0;
class AddCancelledStatuses1764428439449 {
    name = 'AddCancelledStatuses1764428439449';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('waiting', 'confirmed', 'rejected_by_admin', 'rejected_by_user', 'cancelled_by_user', 'cancelled_by_admin', 'shipped', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'waiting'`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum_old" AS ENUM('waiting', 'confirmed', 'rejected_by_admin', 'rejected_by_user', 'shipped', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'waiting'`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"`);
    }
}
exports.AddCancelledStatuses1764428439449 = AddCancelledStatuses1764428439449;
//# sourceMappingURL=1764428439449-add-cancelled-statuses.js.map