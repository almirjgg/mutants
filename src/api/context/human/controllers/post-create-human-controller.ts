import { Request, Response } from 'express';
import { CreateHumanService } from '../../../../shared/context/human/application/create-human-services';
import { v4 as uuid } from 'uuid';
import { InvalidDNASequenceError } from '../../../../shared/context/human/domain/errors-handler/invalid-dna';
import { QueryFailedError } from 'typeorm';

export class PostCreateHumanController {
  constructor(private createHumanService: CreateHumanService) {}

  public async run(req: Request, res: Response) {
    try {
      const { dna }: { dna: string[] } = req.body;
      const entityId: string = uuid();
      const isMutant: boolean = await this.createHumanService.run({ id: entityId, dna });

      if (isMutant) {
        res.status(201).json({ id: entityId, is_mutant: isMutant, dna });
        return;
      } else {
        res.status(200).json({ id: entityId, is_mutant: isMutant, dna });
        return;
      }
    } catch (error) {
      if (error instanceof InvalidDNASequenceError) {
        res.status(400).json({ error: error.message });
        return;
      } else if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        res.status(400).json({ error: 'DNA already exist' });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
}
