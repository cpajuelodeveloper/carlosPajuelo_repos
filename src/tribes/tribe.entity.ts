import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Organization } from '../organizations/organization.entity';

@Entity('tribe')
export class Tribe {
  constructor(partial: Partial<Tribe>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment', { name: 'id_tribe' })
  idTribe: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'id_organization' })
  organization: Organization;
  @Column({ name: 'id_organization' })
  @RelationId((instance: Tribe) => instance.organization)
  idOrganization: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: number;
}
