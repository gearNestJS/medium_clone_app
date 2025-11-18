import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(createUserDto);
  }
}
