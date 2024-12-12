import { DataSource, DataSourceOptions } from "typeorm";
import { configService } from "./config.service";

const datasource = new DataSource(
  configService.getTypeOrmConfig() as DataSourceOptions
);
const adminDatasource = new DataSource(
  configService.getAdminTypeOrmConfig() as DataSourceOptions
);
adminDatasource.initialize();
datasource.initialize();
export default datasource;
export { adminDatasource };
