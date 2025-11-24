import type { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

export interface UserRequestInterface extends Request {
  user?: UserEntity | null;
}
