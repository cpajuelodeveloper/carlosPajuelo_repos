import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Tribe } from './tribe.entity';
import { TribesRepository } from './tribes.repository';

@Injectable()
export class TribesService {
  constructor(private repository: TribesRepository) {}

  create(instance: Tribe): Promise<Tribe> {
    return this.repository.createInstance(instance);
  }

  find(): Promise<Tribe[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Tribe> {
    const instance = await this.repository.findById(id);
    if (!instance) {
      throw new NotFoundException('La Tribu no se encuentra registrada');
    }
    return instance;
  }

  update(instance: Tribe): Promise<UpdateResult> {
    return this.repository.update({ idTribe: instance.idTribe }, instance);
  }

  async removeById(id: number): Promise<void> {
    const instance = await this.findById(id);
    await this.repository.remove(instance);
  }
}
