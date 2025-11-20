import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

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
}
