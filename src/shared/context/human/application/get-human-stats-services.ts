import { HumanRepository } from '../domain/human-repository';

export interface getHumansStatsServiceResponse {
  count_mutant_dna: number;
  count_human_dna: number;
  ratio: number;
}

export class GetHumansStatsService {
  constructor(private humanRepository: HumanRepository) {}

  public async run(): Promise<getHumansStatsServiceResponse> {
    const humans = await this.humanRepository.findAll();
    const countMutantDna = humans.filter(human => human.is_mutant).length;
    const countHumanDna = humans.length;
    const ratio = countMutantDna / countHumanDna;

    return { count_mutant_dna: countMutantDna, count_human_dna: countHumanDna, ratio };
  }
}
