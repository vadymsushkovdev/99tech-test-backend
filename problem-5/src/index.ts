import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response } from 'express';

import { initializeDb } from '@src/config/database/datasource';
import { applyRoutes } from '@src/config/router';
import { httpExceptionMiddleware } from '@src/shared/middlewares/http-exception.middleware';

initializeDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

applyRoutes(app);

app.use(httpExceptionMiddleware);

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port}`
  );
});
