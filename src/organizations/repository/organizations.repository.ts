import { EntityRepository, InsertResult, Repository } from 'typeorm';

import { Organization } from '../organization.entity';

@EntityRepository(Organization)
export class OrganizationsRepository extends Repository<Organization> {
  findById(id: number): Promise<Organization> {
    return this.findOne({ id });
  }

  async createInstance(instance: Organization): Promise<Organization> {
    const newInstance = this.create(instance);
    await this.save(newInstance);
    return newInstance;
  }

  upsertInstance(instance: Organization): Promise<InsertResult> {
    return this.upsert(instance, ['id']);
  }
}
