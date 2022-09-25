import { Metric } from 'src/metrics/metric.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Tribe } from '../tribes/tribe.entity';

@Entity('repository')
export class Repository {
  constructor(partial: Partial<Repository>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment', { name: 'id_repository' })
  idRepository: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  status: number;

  @ManyToOne(() => Tribe)
  @JoinColumn({ name: 'id_tribe' })
  tribe: Tribe;
  @Column({ name: 'id_tribe' })
  @RelationId((instance: Repository) => instance.tribe)
  idTribe: number;

  @OneToMany(() => Metric, (metric) => metric.repository)
  metrics: Metric[];
}
