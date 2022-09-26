import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../core/typeorm-ex.module';

import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { RepositoriesRepository } from './repositories.repository';
import { TribesModule } from '../tribes/tribe.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RepositoriesRepository]),
    TribesModule,
  ],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
