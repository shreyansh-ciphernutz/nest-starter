"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingSessionTable1730871065807 = void 0;
class AddingSessionTable1730871065807 {
    async up(queryRunner) {
        await queryRunner.query(`
        INSERT INTO "user" (id, created_at, updated_at, created_by, updated_by, email, name, password, phone, age)
        VALUES 
            (uuid_generate_v4(), now(), now(), NULL, NULL, 'johndoe@example.com', 'John Doe', 'hashed_password_123', '1234567890', 30),
            (uuid_generate_v4(), now(), now(), NULL, NULL, 'janedoe@example.com', 'Jane Doe', 'hashed_password_456', '0987654321', 25);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "users" WHERE "email" IN ('johndoe@example.com', 'janedoe@example.com');`);
        await queryRunner.query(`DROP TABLE "users";`);
    }
}
exports.AddingSessionTable1730871065807 = AddingSessionTable1730871065807;
//# sourceMappingURL=1730871065807-adding-session-table.js.map