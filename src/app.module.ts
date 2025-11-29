import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import ormConfig from 'ormconfig';
import { AuthMiddleware } from './users/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TagsModule,
    UsersModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
