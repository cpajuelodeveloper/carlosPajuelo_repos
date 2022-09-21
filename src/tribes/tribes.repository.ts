import { Repository } from 'typeorm';

import { CustomRepository } from '../core/typeorm-ex.decorator';
import { Tribe } from './tribe.entity';

@CustomRepository(Tribe)
export class TribesRepository extends Repository<Tribe> {
  findById(id: number): Promise<Tribe> {
    return this.findOne({
      where: {
        idTribe: id,
      },
    });
  }

  async createInstance(instance: Tribe): Promise<Tribe> {
    const newInstance = this.create(instance);
    await this.save(newInstance);
    return newInstance;
  }
}
