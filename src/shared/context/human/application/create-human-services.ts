import { Human } from '../domain/human';
import { HumanRepository } from '../domain/human-repository';

interface CreateHumanServiceDTO {
  id: string;
  dna: string[];
}

export class CreateHumanService {
  constructor(private humanRepository: HumanRepository) {}

  public async run(human: CreateHumanServiceDTO): Promise<boolean> {
    const HumanEntity = Human.create(human);

    const existingHuman = await this.humanRepository.findByDNA(human.dna.join(''));
    if (existingHuman) {
      throw new Error();
    }
    await this.humanRepository.save(HumanEntity);

    return HumanEntity.toPrimitive().is_mutant;
  }
}
