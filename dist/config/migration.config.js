"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_service_1 = require("./config.service");
const datasource = new typeorm_1.DataSource(config_service_1.configService.getTypeOrmConfig());
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=migration.config.js.map