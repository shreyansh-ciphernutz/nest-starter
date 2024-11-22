"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1730867617368 = void 0;
class Migration1730867617368 {
    constructor() {
        this.name = "Migration1730867617368";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "email" citext NOT NULL, "name" citext NOT NULL, "password" text NOT NULL, "phone" citext, "age" smallint, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.Migration1730867617368 = Migration1730867617368;
//# sourceMappingURL=1730867617368-migration.js.map