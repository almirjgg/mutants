import app from './app';
import { AppDataSource } from '../shared/configs/db-config';
import 'reflect-metadata';

const port = process.env.PORT || 3030;
const host = `http://localhost:${process.env.PORT}` || 'http://localhost:3030';
async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(port);
    console.log('Server on port', host);
  } catch (error) {
    console.error(error);
  }
}

main();
