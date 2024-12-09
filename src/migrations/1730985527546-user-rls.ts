import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRls1730985527546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;`
    );
    await queryRunner.query(
      `CREATE POLICY user_data_access_policy ON public.user FOR SELECT TO postgres_visitor USING (FALSE);`
    );
    await queryRunner.query(
      `ALTER TABLE public.user FORCE ROW LEVEL SECURITY;`
    );
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.user NO FORCE ROW LEVEL SECURITY;`
    );
    await queryRunner.query(
      `DROP POLICY IF EXISTS user_data_access_policy ON public.user;`
    );
    await queryRunner.query(
      `ALTER TABLE public.user DISABLE ROW LEVEL SECURITY;`
    );
  }
}
