import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Repository } from './repository.entity';
import { RepositoriesRepository } from './repositories.repository';

@Injectable()
export class RepositoriesService {
  constructor(private repository: RepositoriesRepository) {}

  create(instance: Repository): Promise<Repository> {
    return this.repository.createInstance(instance);
  }

  find(): Promise<Repository[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Repository> {
    const instance = await this.repository.findById(id);
    if (!instance) {
      throw new NotFoundException(Repository.name);
    }
    return instance;
  }

  update(instance: Repository): Promise<UpdateResult> {
    return this.repository.update(
      { idRepository: instance.idRepository },
      instance,
    );
  }

  async removeById(id: number): Promise<void> {
    const instance = await this.findById(id);
    await this.repository.remove(instance);
  }

  mock(): { repositories: { id: number; state: number }[] } {
    return {
      repositories: [
        {
          id: 1,
          state: 604,
        },
        {
          id: 2,
          state: 605,
        },
        {
          id: 3,
          state: 606,
        },
      ],
    };
  }
}
