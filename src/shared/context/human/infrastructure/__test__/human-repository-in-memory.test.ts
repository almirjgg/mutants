import { describe, expect, test } from 'vitest';
import { HumanRepositoryInMemory } from '../human-repository-in-memory';
import { Human } from '../../domain/human';
import { v4 as uuid } from 'uuid';

export const DNA_MUTANT_MOCK = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
export const DNA_NON_MUTANT_MOCK = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
export const HUMAN_ID_MOCK = uuid();

describe('HumanRepositoryInMemory', () => {
  test('Should save a human', async () => {
    const humanRepository = new HumanRepositoryInMemory();
    const humanPayload = Human.create({ id: HUMAN_ID_MOCK, dna: DNA_MUTANT_MOCK });

    await humanRepository.save(humanPayload);

    const humans = await humanRepository.findAll();
    const human = humans.find(Boolean);

    expect(humans).toHaveLength(1);
    expect(human?.id).toBe(humanPayload.id);
  });

  test('Should find all humans', async () => {
    const humanRepository = new HumanRepositoryInMemory();
    const humanPayload = Human.create({ id: HUMAN_ID_MOCK, dna: DNA_MUTANT_MOCK });
    const humanPayloadTwo = Human.create({ id: uuid(), dna: DNA_MUTANT_MOCK });

    await humanRepository.save(humanPayload);
    await humanRepository.save(humanPayloadTwo);

    const humans = await humanRepository.findAll();

    expect(humans).toHaveLength(2);
  });
});
