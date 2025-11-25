import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequestInterface } from 'src/types/express-request.interface';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<UserRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return request.user[data];
    }

    return request.user;
  },
);
