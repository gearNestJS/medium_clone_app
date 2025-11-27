import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userMapper } from 'src/mappers/user.mapper';
import type { UserResponseInterface } from './interfaces/user-response.interface';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @UseGuards(AuthGuard)
  getCurrentUser(@User() user: UserEntity): UserResponseInterface {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return userMapper(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateUser(
    @User('id') id: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    if (!id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.updateUser(id, updateUserDto);
    return userMapper(user);
  }
}
