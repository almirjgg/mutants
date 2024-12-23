import express from 'express';
import cors from 'cors';
import routes from './context/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

export default app;
