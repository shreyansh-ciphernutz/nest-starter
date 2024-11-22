import { DataSource, DataSourceOptions } from "typeorm";
import { configService } from "./config.service";

const datasource = new DataSource(
  configService.getTypeOrmConfig() as DataSourceOptions,
);
datasource.initialize();
export default datasource;