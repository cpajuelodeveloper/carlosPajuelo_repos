import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../core/typeorm-ex.module';

import { TribesController } from './tribes.controller';
import { TribesService } from './tribes.service';
import { TribesRepository } from './tribes.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TribesRepository])],
  controllers: [TribesController],
  providers: [TribesService],
  exports: [TribesService],
})
export class TribesModule {}
