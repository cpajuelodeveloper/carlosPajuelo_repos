import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const dbUrl = new URL(process.env.COCKROACH_DB_URL);
  const routingId = dbUrl.searchParams.get('options');
  dbUrl.searchParams.delete('options');
  return {
    type: 'cockroachdb',
    url: dbUrl.toString(),
    ssl: true,
    extra: {
      options: routingId,
    },
    entities: [`${__dirname}/**/**/**.entity{.ts,.js}`],
    autoLoadEntities: true,
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
    logger: 'file',
    migrationsTableName: 'migrations',
    migrations: [`${__dirname}/**/migrations/**/*{.ts,.js}`],
  };
});
