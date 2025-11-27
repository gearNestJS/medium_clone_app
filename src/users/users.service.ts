import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;

    const [existingEmail, existingUsername] = await Promise.all([
      this.userRepository.findOneBy({ email }),
      this.userRepository.findOneBy({ username }),
    ]);

    if (existingUsername && existingEmail) {
      throw new HttpException(
        'Username and Email are already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (existingEmail) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (existingUsername) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  /** Auth user */
  async authUser(authUserDto: AuthUserDto): Promise<UserEntity> {
    const { email, password } = authUserDto;

    const findUser = await this.userRepository.findOneBy({ email });

    if (!findUser) {
      throw new HttpException(
        `User with email ${email} is not exists`,
        HttpStatus.NOT_FOUND,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const isPasswordEqual = await compare<boolean>(password, findUser.password);

    if (!isPasswordEqual) {
      throw new HttpException(
        `User with password ${password} is not exists`,
        HttpStatus.NOT_FOUND,
      );
    }

    return findUser;
  }

  /** Get user by id */
  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        `User with id ${id} is not exists`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUser(id);

    // Объединяем существующие данные пользователя с новыми данными
    this.userRepository.merge(user, updateUserDto);

    // Сохраняем обновленные данные в базе данных
    return await this.userRepository.save(user);
  }
}
