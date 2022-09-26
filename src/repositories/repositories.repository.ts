import { Repository as _Repository } from 'typeorm';

import { CustomRepository } from '../core/typeorm-ex.decorator';
import { Repository } from './repository.entity';

@CustomRepository(Repository)
export class RepositoriesRepository extends _Repository<Repository> {
  findById(id: number): Promise<Repository> {
    return this.findOne({
      where: {
        idRepository: id,
      },
    });
  }

  async createInstance(instance: Repository): Promise<Repository> {
    const newInstance = this.create(instance);
    await this.save(newInstance);
    return newInstance;
  }
}
