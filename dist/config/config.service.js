"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = exports.ConfigService = void 0;
const path = require("path");
const dotenv = require("dotenv");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entity_subscriber_1 = require("../subscriber/entity.subscriber");
dotenv.config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
    isProduction() {
        const mode = this.getValue("NODE_ENV", false);
        return mode === "production";
    }
    isDev() {
        const mode = this.getValue("NODE_ENV", false);
        return mode === "development";
    }
    getTypeOrmConfig() {
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
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            migrations: [baseDir + "/migrations/**/*{.ts,.js}"],
            migrationsTableName: "typeorm_migrations",
            ssl: false,
            subscribers: [entity_subscriber_1.EntitySubscriber],
            logging: true,
            extra: {
                max: 10,
                min: 2,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            },
        };
    }
    getAdminTypeOrmConfig() {
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
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            migrations: [baseDir + "/migrations/**/*{.ts,.js}"],
            migrationsTableName: "typeorm_migrations",
            ssl: false,
            subscribers: [entity_subscriber_1.EntitySubscriber],
            logging: true,
            extra: {
                max: 10,
                min: 2,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            },
        };
    }
    get(key) {
        return this.getValue(key);
    }
}
exports.ConfigService = ConfigService;
const configService = new ConfigService(process.env).ensureValues([
    "NODE_ENV",
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_DATABASE",
    "JWT_SECRET",
]);
exports.configService = configService;
//# sourceMappingURL=config.service.js.map