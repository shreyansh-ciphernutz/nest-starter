"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaAccessToRoles1731066607029 = void 0;
class SchemaAccessToRoles1731066607029 {
    async up(queryRunner) {
        await queryRunner.query(`GRANT USAGE ON SCHEMA public TO postgres_visitor`);
        await queryRunner.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO postgres_visitor`);
        await queryRunner.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO postgres_visitor`);
        await queryRunner.query(`GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO postgres_visitor`);
    }
    async down(queryRunner) {
        await queryRunner.query(`REVOKE USAGE ON SCHEMA public FROM postgres_visitor`);
        await queryRunner.query(`REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES FROM postgres_visitor`);
        await queryRunner.query(`REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE USAGE, SELECT ON SEQUENCES FROM postgres_visitor`);
        await queryRunner.query(`REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM postgres_visitor`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM postgres_visitor`);
    }
}
exports.SchemaAccessToRoles1731066607029 = SchemaAccessToRoles1731066607029;
//# sourceMappingURL=1730867617365-schema-access-to-roles.js.map