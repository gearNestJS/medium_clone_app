import { Tag } from './src/tags/tag.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

const configOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medium_user',
  password: 'medium_password',
  database: 'medium_clone_db',
  entities: [Tag],
  synchronize: false,
  migrations: ['./src/migrations/**/*.ts'],
  subscribers: [],
};

export const AppDataSource = new DataSource(configOptions);
