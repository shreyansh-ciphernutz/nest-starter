import { DataSource, DataSourceOptions } from "typeorm";
import { configService } from "./config.service";

const datasource = new DataSource(
  configService.getTypeOrmConfig() as DataSourceOptions
);
// const datasource1 = new DataSource(
//   configService.getAdminTypeOrmConfig() as DataSourceOptions
// );
datasource.initialize();
// datasource1.initialize();
export  default datasource;
