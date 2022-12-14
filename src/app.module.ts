import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { OrganizationsModule } from './organizations/organizations.module';
import { DataSource } from 'typeorm';
import { TYPEORM_CONFIG } from './config/constants';
import { TribesModule } from './tribes/tribe.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    OrganizationsModule,
    TribesModule,
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
