/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash, genSalt } from 'bcrypt';
import { isHashed } from 'src/utils/is-hashed.util';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
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
