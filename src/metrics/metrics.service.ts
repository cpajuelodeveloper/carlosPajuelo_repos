import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Metric } from './metric.entity';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
  constructor(private repository: MetricsRepository) {}

  create(instance: Metric): Promise<Metric> {
    return this.repository.createInstance(instance);
  }

  find(): Promise<Metric[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Metric> {
    const instance = await this.repository.findById(id);
    if (!instance) {
      throw new NotFoundException(Metric.name);
    }
    return instance;
  }

  update(instance: Metric): Promise<UpdateResult> {
    return this.repository.update(
      { idRepository: instance.idRepository },
      instance,
    );
  }

  async removeById(id: number): Promise<void> {
    const instance = await this.findById(id);
    await this.repository.remove(instance);
  }
}
