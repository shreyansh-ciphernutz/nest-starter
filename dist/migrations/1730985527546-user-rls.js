"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRls1730985527546 = void 0;
class UserRls1730985527546 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;`);
        await queryRunner.query(`CREATE POLICY user_data_access_policy ON public.user FOR SELECT TO postgres_visitor USING (FALSE);`);
        await queryRunner.query(`ALTER TABLE public.user FORCE ROW LEVEL SECURITY;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE public.user NO FORCE ROW LEVEL SECURITY;`);
        await queryRunner.query(`DROP POLICY IF EXISTS user_data_access_policy ON public.user;`);
        await queryRunner.query(`ALTER TABLE public.user DISABLE ROW LEVEL SECURITY;`);
    }
}
exports.UserRls1730985527546 = UserRls1730985527546;
//# sourceMappingURL=1730985527546-user-rls.js.map