import { Request, Response } from 'express';
import { GetHumansStatsService } from '../../../../shared/context/human/application/get-human-stats-services';

export class GetHumanStatsController {
  constructor(private getHumansStatsService: GetHumansStatsService) {}

  public async run(_req: Request, res: Response) {
    try {
      const response = await this.getHumansStatsService.run();
      res.status(200).json(response);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
}
