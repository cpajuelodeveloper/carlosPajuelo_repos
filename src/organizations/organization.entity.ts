import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class Organization {
  constructor(partial: Partial<Organization>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment', { name: 'id_organization' })
  idOrganization: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: number;
}
