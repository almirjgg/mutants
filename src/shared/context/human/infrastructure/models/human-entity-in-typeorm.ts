import { Entity, Column, PrimaryColumn, BaseEntity, Index } from 'typeorm';

@Entity({ name: 'humans' })
export class HumanEntityInTypeorm extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Index({ unique: true })
  @Column('simple-array')
  dna!: string[];

  @Column({ type: 'boolean' })
  is_mutant: boolean;
}
