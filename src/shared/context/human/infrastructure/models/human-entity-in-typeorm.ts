import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'humans' })
export class HumanEntityInTypeorm extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'boolean' })
  is_mutant: boolean;
}
