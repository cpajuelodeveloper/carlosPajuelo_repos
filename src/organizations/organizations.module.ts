import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../core/typeorm-ex.module';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationsRepository } from './organizations.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([OrganizationsRepository])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
