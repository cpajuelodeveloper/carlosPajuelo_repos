import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { Tribe } from '../tribes/tribe.entity';

@Entity('metric')
export class Metric {
  constructor(partial: Partial<Metric>) {
    Object.assign(this, partial);
  }

  @Column({ name: 'id_repository' })
  @RelationId((instance: Metric) => instance.repository)
  @PrimaryColumn()
  idRepository: number;

  @ManyToOne(() => Tribe)
  @JoinColumn({ name: 'id_repository' })
  repository: Tribe;

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
