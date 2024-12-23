import { Repository } from 'typeorm';
import { AppDataSource } from '../../../configs/db-config';
import { Human, HumanPrimitive } from '../domain/human';
import { HumanRepository } from '../domain/human-repository';
import { HumanEntityInTypeorm } from './models/human-entity-in-typeorm';

export class HumanRepositoryInTypeorm implements HumanRepository {
  private humanRepositoryEntity: Repository<HumanEntityInTypeorm>;

  constructor() {
    this.humanRepositoryEntity = AppDataSource.getRepository(HumanEntityInTypeorm);
  }

  async save(human: Human): Promise<void> {
    await this.humanRepositoryEntity.save(human);
  }

  async findAll(): Promise<HumanPrimitive[]> {
    return this.humanRepositoryEntity.find();
  }
}
