"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOrderEmailNullable1765500000000 = void 0;
class MakeOrderEmailNullable1765500000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "email" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`UPDATE "order" SET "email" = '' WHERE "email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "email" SET NOT NULL`);
    }
}
exports.MakeOrderEmailNullable1765500000000 = MakeOrderEmailNullable1765500000000;
//# sourceMappingURL=1765500000000-make-order-email-nullable.js.map