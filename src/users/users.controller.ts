import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userMapper } from 'src/mappers/user.mapper';
import type { UserResponseInterface } from './interfaces/user-response.interface';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserEntity } from './user.entity';
import { User } from './decorators/user.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.createUser(createUserDto);

    return userMapper(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async authUser(
    @Body('user') authUserDto: AuthUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.authUser(authUserDto);

    return userMapper(user);
  }

  @Get('user')
  getCurrentUser(@User() user: UserEntity): UserResponseInterface {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return userMapper(user);
  }
}
