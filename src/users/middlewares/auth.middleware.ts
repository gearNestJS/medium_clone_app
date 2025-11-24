/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { UserRequestInterface } from 'src/types/express-request.interface';
import { verify } from 'jsonwebtoken';
import { JWT_TOKEN_SECRET_KEY } from 'src/config';
import { UsersService } from '../users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: UserRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();

      return;
    }

    const reqToken = req.headers.authorization.split(' ')[1];
    try {
      const { id } = verify(reqToken, JWT_TOKEN_SECRET_KEY);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await this.usersService.getUser(id);
      req.user = user;

      next();
    } catch (e) {
      console.log(e);
      req.user = null;

      next();
    }
  }
}
