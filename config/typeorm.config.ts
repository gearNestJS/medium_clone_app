import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost', // 'db' для Docker
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'medium_user',
  password: process.env.DATABASE_PASSWORD || 'medium_password',
  database: process.env.DATABASE_NAME || 'medium_clone_db',
  entities: [Tag],
  synchronize: false, // В продакшене всегда false. Для разработки можно временно поставить true, но лучше использовать миграции.
  migrations: ['dist/migrations/**/*.js'], // Путь к вашим миграциям после компиляции
  migrationsRun: false, // Не запускать миграции автоматически при запуске приложения
  autoLoadEntities: true, // Автоматически загружать сущности
  logging: true, // Включить логирование SQL-запросов (полезно для отладки)
};
