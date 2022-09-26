import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { Repository } from './repository.entity';
import { RepositoriesRepository } from './repositories.repository';
import { RepositoryMetrics } from '../common/interfaces/repository-metrics.interface';

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

  async getRepositoryMetrics(
    idTribe: number,
    minimunCoverage: number = 0,
  ): Promise<RepositoryMetrics[]> {
    const metrics = await this.repository
      .createQueryBuilder()
      .select('Repository.id_repository', 'id')
      .addSelect('Repository.name', 'name')
      .addSelect('tribe.name', 'tribe')
      .addSelect('organization.name', 'organization')
      .addSelect('metrics.coverage', 'coverage')
      .addSelect('metrics.code_smells', 'codeSmells')
      .addSelect('metrics.bugs', 'bugs')
      .addSelect('metrics.vulnerabilities', 'vulnerabilities')
      .addSelect('metrics.hotspot', 'hotspots')
      .addSelect('Repository.state', 'verificationState')
      .addSelect('Repository.status', 'state')
      .innerJoin('Repository.metrics', 'metrics')
      .innerJoin('Repository.tribe', 'tribe')
      .innerJoin('tribe.organization', 'organization')
      .where('tribe.id_tribe = :idTribe', {
        idTribe,
      })
      .andWhere('metrics.coverage >= :coverage', {
        coverage: minimunCoverage,
      })
      .getRawMany<RepositoryMetrics>();
    if (!metrics.length) {
      throw new NotFoundException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }

    return metrics;
  }
}
