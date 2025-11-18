import { Tag } from './src/tags/tag.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'medium_user',
  password: 'medium_password',
  database: 'medium_clone_db',
  entities: [Tag],
  synchronize: false,
  migrations: [], // Обычно не нужны в конфигурации NestJS
  subscribers: [],
};

export default ormConfig;
