import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../core/typeorm-ex.module';

import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { RepositoriesRepository } from './repositories.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RepositoriesRepository])],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
