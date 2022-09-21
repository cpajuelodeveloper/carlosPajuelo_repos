import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfiguration from './database.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

const AppDataSource = new DataSource({
  ...(<DataSourceOptions>dbConfiguration()),
  migrationsTableName: 'migrations',
  migrations: ['**/migrations/*.ts'],
  logging: 'all',
  logger: 'advanced-console',
});

export default AppDataSource;
