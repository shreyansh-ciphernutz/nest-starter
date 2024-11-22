import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaAccessToRoles1731066607029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Grant USAGE on the schema to the visitor
        await queryRunner.query(
            `GRANT USAGE ON SCHEMA public TO postgres_visitor`
        );

        // Grant permissions on all existing tables in the public schema
        await queryRunner.query(
            `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres_visitor`
        );

        // Set default privileges on future tables in the public schema
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO postgres_visitor`
        );

        // Grant usage and select on all sequences in the public schema (if needed)
        await queryRunner.query(
            `GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres_visitor`
        );

        // Set default privileges for future sequences
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO postgres_visitor`
        );

        // Grant EXECUTE privileges on all functions in the public schema (if needed)
        await queryRunner.query(
            `GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres_visitor`
        );

        // Set default privileges for future functions
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO postgres_visitor`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revoke USAGE on schema public
        await queryRunner.query(
            `REVOKE USAGE ON SCHEMA public FROM postgres_visitor`
        );

        // Revoke permissions on all tables in the public schema
        await queryRunner.query(
            `REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM postgres_visitor`
        );

        // Revoke default privileges on future tables
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES FROM postgres_visitor`
        );

        // Revoke privileges on all sequences in the public schema
        await queryRunner.query(
            `REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM postgres_visitor`
        );

        // Revoke default privileges on future sequences
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE USAGE, SELECT ON SEQUENCES FROM postgres_visitor`
        );

        // Revoke EXECUTE privileges on all functions in the public schema
        await queryRunner.query(
            `REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM postgres_visitor`
        );

        // Revoke default privileges on future functions
        await queryRunner.query(
            `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM postgres_visitor`
        );
    }
}
