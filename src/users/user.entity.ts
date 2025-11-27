/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash, genSalt } from 'bcrypt';

// Утилита миграции TypeORM плохо понимает абсолютные пути импортов - лучше всегда использовать относительные пути для таких случаев
import { isHashed } from '../utils/is-hashed.util';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // Не хэшируем, если пароль пустой или уже захеширован
    if (this.password.length === 0 || isHashed(this.password)) {
      return;
    }

    const salt = await genSalt(13);
    this.password = await hash(this.password, salt);
  }

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;
}
