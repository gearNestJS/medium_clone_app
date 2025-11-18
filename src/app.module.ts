import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import ormConfig from 'ormconfig';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), TagsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
