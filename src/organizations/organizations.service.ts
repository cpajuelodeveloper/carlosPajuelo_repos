import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Organization } from './organization.entity';
import { OrganizationsRepository } from './organizations.repository';

@Injectable()
export class OrganizationsService {
  constructor(private repository: OrganizationsRepository) {}

  create(instance: Organization): Promise<Organization> {
    return this.repository.createInstance(instance);
  }

  find(): Promise<Organization[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Organization> {
    const instance = await this.repository.findById(id);
    if (!instance) {
      throw new NotFoundException(Organization.name);
    }
    return instance;
  }

  update(instance: Organization): Promise<UpdateResult> {
    return this.repository.update(
      { idOrganization: instance.idOrganization },
      instance,
    );
  }

  async removeById(id: number): Promise<void> {
    const instance = await this.findById(id);
    await this.repository.remove(instance);
  }
}
