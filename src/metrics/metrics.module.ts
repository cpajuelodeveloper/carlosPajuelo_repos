import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../core/typeorm-ex.module';

import { MetricsService } from './metrics.service';
import { MetricsRepository } from './metrics.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([MetricsRepository])],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
