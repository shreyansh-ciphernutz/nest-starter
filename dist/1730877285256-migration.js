"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1730877285256 = void 0;
class Migration1730877285256 {
    constructor() {
        this.name = 'Migration1730877285256';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "email" citext NOT NULL, "name" citext NOT NULL, "password" text NOT NULL, "phone" citext, "age" smallint, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "user_id" uuid, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.Migration1730877285256 = Migration1730877285256;
//# sourceMappingURL=1730877285256-migration.js.map