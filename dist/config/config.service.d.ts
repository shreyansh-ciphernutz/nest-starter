import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class ConfigService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    ensureValues(keys: string[]): this;
    isProduction(): boolean;
    isDev(): boolean;
    getTypeOrmConfig(): TypeOrmModuleOptions;
    getAdminTypeOrmConfig(): TypeOrmModuleOptions;
    get(key: any): string;
}
declare const configService: ConfigService;
export { configService };
