import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingSessionTable1730871065807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "user" (id, created_at, updated_at, created_by, updated_by, email, name, password, phone, age)
        VALUES 
            (uuid_generate_v4(), now(), now(), NULL, NULL, 'johndoe@example.com', 'John Doe', 'hashed_password_123', '1234567890', 30),
            (uuid_generate_v4(), now(), now(), NULL, NULL, 'janedoe@example.com', 'Jane Doe', 'hashed_password_456', '0987654321', 25);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE "email" IN ('johndoe@example.com', 'janedoe@example.com');`);
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
