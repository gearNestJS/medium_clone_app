import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

const configOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'medium_user',
  password: process.env.DB_PASSWORD || 'medium_password',
  database: process.env.DB_NAME || 'medium_clone_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: [],
};

export const AppDataSource = new DataSource(configOptions);
