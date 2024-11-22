"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRls1730985527546 = void 0;
class UserRls1730985527546 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE POLICY user_data_access_policy ON public.user FOR SELECT using (FALSE);`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP POLICY IF EXISTS user_data_access_policy ON public.user;`);
    }
}
exports.UserRls1730985527546 = UserRls1730985527546;
//# sourceMappingURL=1730985527546-user-rls.js.map