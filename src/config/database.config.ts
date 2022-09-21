import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function typeormModuleOptions(): TypeOrmModuleOptions {
  const dbUrl = new URL(process.env.COCKROACH_DB_URL);
  const routingId = dbUrl.searchParams.get("options");
  dbUrl.searchParams.delete("options");
  return {
    type: "cockroachdb",
    url: dbUrl.toString(),
    ssl: true,
    extra: {
        options: routingId
    },
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    logger: 'file',
  };
}
export const databaseConfig = registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
