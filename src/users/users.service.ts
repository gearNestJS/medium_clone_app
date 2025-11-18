import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async createUser(user: CreateUserDto): Promise<CreateUserDto> {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return await user;
  }
}
