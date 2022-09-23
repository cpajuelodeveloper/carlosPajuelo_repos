import { Repository as _Repository, UpdateResult } from 'typeorm';

import { CustomRepository } from '../core/typeorm-ex.decorator';
import { Metric } from './metric.entity';

@CustomRepository(Metric)
export class MetricsRepository extends _Repository<Metric> {
  findById(id: number): Promise<Metric> {
    return this.findOne({
      where: {
        idRepository: id,
      },
    });
  }

  async createInstance(instance: Metric): Promise<Metric> {
    const newInstance = this.create(instance);
    await this.save(newInstance);
    return newInstance;
  }
}
