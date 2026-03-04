"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNameToUser1765417200000 = void 0;
const typeorm_1 = require("typeorm");
class AddNameToUser1765417200000 {
    name = 'AddNameToUser1765417200000';
    async up(queryRunner) {
        await queryRunner.addColumn("user", new typeorm_1.TableColumn({
            name: "name",
            type: "character varying",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("user", "name");
    }
}
exports.AddNameToUser1765417200000 = AddNameToUser1765417200000;
//# sourceMappingURL=1765417200000-add-name-to-user.js.map