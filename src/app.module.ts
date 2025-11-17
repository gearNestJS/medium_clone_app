import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Tag } from './tags/tag.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'medium_user',
      password: 'medium_password',
      database: 'medium_clone_db',
      entities: [Tag], // Список всех сущностей
      synchronize: true, // ВНИМАНИЕ: Используйте `synchronize: true` ТОЛЬКО для разработки!
      // В продакшене используйте миграции TypeORM.
      autoLoadEntities: true, // Автоматически загружать сущности
    }),
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
