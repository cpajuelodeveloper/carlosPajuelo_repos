import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  status: number;
}
