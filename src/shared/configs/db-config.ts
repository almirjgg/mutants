import { DataSource } from 'typeorm';
import { HumanEntityInTypeorm } from '../context/human/infrastructure/models/human-entity-in-typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5449', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [HumanEntityInTypeorm],
  synchronize: true,
});
