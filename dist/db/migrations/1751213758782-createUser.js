"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1751213758782 = void 0;
class CreateUser1751213758782 {
    name = 'CreateUser1751213758782';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "profileImg" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateUser1751213758782 = CreateUser1751213758782;
//# sourceMappingURL=1751213758782-createUser.js.map