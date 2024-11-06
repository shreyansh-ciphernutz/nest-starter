"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RlsOnUser1730878293972 = void 0;
class RlsOnUser1730878293972 {
    constructor() {
        this.name = "RlsOnUser1730878293972";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE POLICY user_data_access_policy ON public.user FOR SELECT using (FALSE)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP POLICY IF EXISTS user_data_access_policy ON public.user;`);
    }
}
exports.RlsOnUser1730878293972 = RlsOnUser1730878293972;
//# sourceMappingURL=1730878293972-rls-on-user.js.map