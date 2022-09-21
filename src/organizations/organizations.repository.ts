import { InsertResult, Repository, UpdateResult } from 'typeorm';

import { CustomRepository } from '../core/typeorm-ex.decorator';
import { Organization } from './organization.entity';

@CustomRepository(Organization)
export class OrganizationsRepository extends Repository<Organization> {
  findById(id: number): Promise<Organization> {
    return this.findOne({
      where: {
        idOrganization: id,
      },
    });
  }

  async createInstance(instance: Organization): Promise<Organization> {
    const newInstance = this.create(instance);
    await this.save(newInstance);
    return newInstance;
  }
}
