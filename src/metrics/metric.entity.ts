import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { Repository } from '../repositories/repository.entity';

@Entity('metrics')
export class Metric {
  constructor(partial: Partial<Metric>) {
    Object.assign(this, partial);
  }

  @RelationId((instance: Metric) => instance.repository)
  @PrimaryColumn({ name: 'id_repository' })
  idRepository: number;

  @ManyToOne(() => Repository)
  @JoinColumn({ name: 'id_repository' })
  repository: Repository;

  @Column({ nullable: false })
  coverage: number;

  @Column({ nullable: false })
  bugs: number;

  @Column({ nullable: false })
  vulnerabilities: number;

  @Column({ nullable: false })
  hotspot: number;

  @Column({ name: 'code_smells', nullable: false })
  codeSmells: number;
}
