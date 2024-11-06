import { MigrationInterface, QueryRunner } from "typeorm";

export class RlsOnUser1730878293972 implements MigrationInterface {
  name = "RlsOnUser1730878293972";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "user_id" uuid, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    // await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // await queryRunner.query('')
    await queryRunner.query(
      `CREATE POLICY user_data_access_policy ON public.user FOR SELECT using (FALSE)`
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
    // await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP POLICY IF EXISTS user_data_access_policy ON public.user;`
    );

  }
}
