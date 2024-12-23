import { Human } from '../domain/human';
import { HumanRepository } from '../domain/human-repository';

export class HumanRepositoryInMemory implements HumanRepository {
  private humansMemory: Human[] = [];

  async save(human: Human): Promise<void> {
    this.humansMemory.push(human);
  }

  async findAll(): Promise<Human[]> {
    return this.humansMemory;
  }
}
