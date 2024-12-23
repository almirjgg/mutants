import { describe, test, beforeEach, expect } from 'vitest';
import { HumanRepository } from '../../domain/human-repository';
import { CreateHumanService } from '../create-human-services';
import { HumanRepositoryInMemory } from '../../infrastructure/human-repository-in-memory';
import { v4 as uuid } from 'uuid';
import { DNA_MUTANT_MOCK, DNA_NON_MUTANT_MOCK } from './mocks/human';
import { GetHumansStatsService } from '../get-human-stats-services';

const HUMAN_ID_MOCK = uuid();

describe('GetHumansStatsService', () => {
  let humanRepository: HumanRepository;
  let createHumanService: CreateHumanService;
  let getHumansStatsService: GetHumansStatsService;

  beforeEach(async () => {
    humanRepository = new HumanRepositoryInMemory();
    createHumanService = new CreateHumanService(humanRepository);
    getHumansStatsService = new GetHumansStatsService(humanRepository);
  });

  test('Should get humans stats when human is mutant', async () => {
    await createHumanService.run({
      id: HUMAN_ID_MOCK,
      dna: DNA_MUTANT_MOCK,
    });

    const stats = getHumansStatsService.run();

    expect(stats).resolves.toEqual({
      count_mutant_dna: 1,
      count_human_dna: 1,
      ratio: 1,
    });
  });

  test('Should get humans stats when human is not mutant', async () => {
    await createHumanService.run({
      id: HUMAN_ID_MOCK,
      dna: DNA_NON_MUTANT_MOCK,
    });

    const stats = getHumansStatsService.run();

    expect(stats).resolves.toEqual({
      count_mutant_dna: 0,
      count_human_dna: 1,
      ratio: 0,
    });
  });

  test('Should get humans stats when human is not mutant', async () => {
    await createHumanService.run({
      id: HUMAN_ID_MOCK,
      dna: DNA_NON_MUTANT_MOCK,
    });

    await createHumanService.run({
      id: uuid(),
      dna: DNA_MUTANT_MOCK,
    });

    const stats = getHumansStatsService.run();

    expect(stats).resolves.toEqual({
      count_mutant_dna: 1,
      count_human_dna: 2,
      ratio: 0.5,
    });
  });
});
