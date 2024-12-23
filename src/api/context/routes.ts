import { Router } from 'express';
import { PostCreateHumanController } from './human/controllers/post-create-human-controller';
import { GetHumanStatsController } from './human/controllers/get-human-stats-controller';
import { createHumanService, getHumansStatsService } from '../../shared/context/human/human-module';

const router = Router();

const createHuman = new PostCreateHumanController(createHumanService);
const getHumansStats = new GetHumanStatsController(getHumansStatsService);

router.get('/stats', (req, res) => getHumansStats.run(req, res));
router.post('/mutant', (req, res) => createHuman.run(req, res));

export default router;
