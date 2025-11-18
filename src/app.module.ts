import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import ormConfig from 'ormconfig';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), TagsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
