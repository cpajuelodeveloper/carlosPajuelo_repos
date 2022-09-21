import { EntityRepository, InsertResult, Repository } from 'typeorm';

import { Organization } from '../organization.entity';

export class OrganizationsRepository extends Repository<Organization> {
  findById(id: number): Promise<Organization> {
    return this.findOne({
      where: {
        id,
      },
    });
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
