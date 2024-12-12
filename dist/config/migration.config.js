"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDatasource = void 0;
const typeorm_1 = require("typeorm");
const config_service_1 = require("./config.service");
const datasource = new typeorm_1.DataSource(config_service_1.configService.getTypeOrmConfig());
const adminDatasource = new typeorm_1.DataSource(config_service_1.configService.getAdminTypeOrmConfig());
exports.adminDatasource = adminDatasource;
adminDatasource.initialize();
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=migration.config.js.map