import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRls1730985527546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE POLICY user_data_access_policy ON public.user FOR SELECT using (FALSE);`
    );
  } 

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY IF EXISTS user_data_access_policy ON public.user;`
    );
  }
}
