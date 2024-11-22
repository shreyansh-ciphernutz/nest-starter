import { MigrationInterface, QueryRunner } from "typeorm";

export class GettingCurrentSessionAndUserFunctions1730965665894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "user_id" uuid, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION current_session_id()
        RETURNS UUID AS $$
          select nullif(pg_catalog.current_setting('jwt.claims.session_id', true), '')::uuid;
          $$ language sql stable;
          `
    );
    await queryRunner.query(
      "Comment on function current_session_id() is $$ Get current session from setting.jwt.claims  $$"
    );
    await queryRunner.query(
      `create function current_user_id() returns uuid as $$
      select user_id from session where id = current_session_id();
    $$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;
    `
    );

    await queryRunner.query(
      "Comment on function current_user_id() is $$ Get the current user id from current session  $$"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION current_user_id`);
    await queryRunner.query(`DROP FUNCTION current_session_id`);
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`
    );
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
