import { CreateHumanService } from './application/create-human-services';
import { GetHumansStatsService } from './application/get-human-stats-services';
import { HumanRepositoryInTypeorm } from './infrastructure/human-repository-in-typeorm';

const humanRepositoryInTypeorm = new HumanRepositoryInTypeorm();

export const createHumanService = new CreateHumanService(humanRepositoryInTypeorm);
export const getHumansStatsService = new GetHumansStatsService(humanRepositoryInTypeorm);
