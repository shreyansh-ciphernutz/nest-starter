import * as path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { EntitySubscriber } from "../subscriber/entity.subscriber";

dotenv.config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isProduction() {
    const mode = this.getValue("NODE_ENV", false);
    return mode === "production";
  }

  public isDev() {
    const mode = this.getValue("NODE_ENV", false);
    return mode === "development";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const baseDir = path.join(__dirname, "..");
    return {
      type: "postgres",
      host: this.getValue("DB_HOST"),
      port: parseInt(this.getValue("DB_PORT")),
      username: "postgres_visitor",
      password: "visitor_password",
      database: this.getValue("DB_DATABASE"),
      entities: [baseDir + "/**/*.entity{.ts,.js}"],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      migrations: [baseDir + "/migrations/**/*{.ts,.js}"],
      migrationsTableName: "typeorm_migrations",
      ssl: false,
      subscribers: [EntitySubscriber],
      logging: true,
      extra: {
        max: 10, //connections in the pool
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
    };
  }
  public getAdminTypeOrmConfig(): TypeOrmModuleOptions {
    const baseDir = path.join(__dirname, "..");
    return {
      name: "owner",
      type: "postgres",
      host: this.getValue("DB_HOST"),
      port: parseInt(this.getValue("DB_PORT")),
      username: "postgres_owner",
      password: "owner_password",
      database: this.getValue("DB_DATABASE"),
      entities: [baseDir + "/**/*.entity{.ts,.js}"],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      migrations: [baseDir + "/migrations/**/*{.ts,.js}"],
      migrationsTableName: "typeorm_migrations",
      ssl: false,
      subscribers: [EntitySubscriber],
      logging: true,
      extra: {
        max: 10, //connections in the pool
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
    };
  }

  public get(key): string {
    return this.getValue(key);
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "NODE_ENV",
  "DB_HOST",
  "DB_PORT",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_DATABASE",
  "JWT_SECRET",
]);

export { configService };
