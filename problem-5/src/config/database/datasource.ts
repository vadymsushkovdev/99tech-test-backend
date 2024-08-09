import { DataSource } from 'typeorm';

import { CreateUser1723202405536 } from '@src/config/migrations/1723202405536-CreateUser';
import { User } from '@src/modules/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  migrations: [CreateUser1723202405536],
  logging: true,
  synchronize: false,
  migrationsRun: true,
});

export const initializeDb = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
};
