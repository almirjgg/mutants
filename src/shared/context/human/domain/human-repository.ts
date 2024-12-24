import { Human, HumanPrimitive } from './human';

export interface HumanRepository {
  save(human: Human): Promise<void>;
  findAll(): Promise<HumanPrimitive[]>;
  findByDNA(dna: string): Promise<boolean>;
}
