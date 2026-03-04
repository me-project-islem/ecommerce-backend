"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTrackingNumber1764427754906 = void 0;
class AddTrackingNumber1764427754906 {
    name = 'AddTrackingNumber1764427754906';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order" ADD "trackingNumber" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('waiting', 'confirmed', 'rejected_by_admin', 'rejected_by_user', 'shipped', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'waiting'`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum_old" AS ENUM('waiting', 'confirmed', 'rejected_by_admin', 'rejected_by_user')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'waiting'`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "trackingNumber"`);
    }
}
exports.AddTrackingNumber1764427754906 = AddTrackingNumber1764427754906;
//# sourceMappingURL=1764427754906-add-tracking-number.js.map