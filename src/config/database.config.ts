import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

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
    entities: [join(__dirname, '../**/*.entity{.js,.ts}')],
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
    logger: 'file',
  };
});
