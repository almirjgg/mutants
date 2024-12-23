import { describe, test, beforeEach, expect } from 'vitest';
import { HumanRepository } from '../../domain/human-repository';
import { CreateHumanService } from '../create-human-services';
import { HumanRepositoryInMemory } from '../../infrastructure/human-repository-in-memory';
import { v4 as uuid } from 'uuid';
import { DNA_MUTANT_MOCK, DNA_NON_MUTANT_MOCK } from './mocks/human';

const HUMAN_ID_MOCK = uuid();

describe('CreateHumanService', () => {
  let humanRepository: HumanRepository;
  let createHumanService: CreateHumanService;

  beforeEach(async () => {
    humanRepository = new HumanRepositoryInMemory();
    createHumanService = new CreateHumanService(humanRepository);
  });

  test('Should create a human mutant', async () => {
    await createHumanService.run({
      id: HUMAN_ID_MOCK,
      dna: DNA_MUTANT_MOCK,
    });

    const humans = await humanRepository.findAll();
    const human = humans.find(Boolean);

    expect(humans.length).toBe(1);
    expect(human?.is_mutant).toBe(true);
    expect(human?.id).toBe(HUMAN_ID_MOCK);
  });

  test('Should create a human non mutant', async () => {
    await createHumanService.run({
      id: HUMAN_ID_MOCK,
      dna: DNA_NON_MUTANT_MOCK,
    });

    const humans = await humanRepository.findAll();
    const human = humans.find(Boolean);

    expect(humans.length).toBe(1);
    expect(human?.is_mutant).toBe(false);
    expect(human?.id).toBe(HUMAN_ID_MOCK);
  });

  test('Should error invalid dna', async () => {
    const payload = {
      id: HUMAN_ID_MOCK,
      dna: ['1234', '1234', '1234', '1234'],
    };

    await expect(createHumanService.run(payload)).rejects.toThrow(
      "Invalid DNA sequence. The string must contain only the characters 'a', 't', 'c', or 'g'.",
    );
  });
});
