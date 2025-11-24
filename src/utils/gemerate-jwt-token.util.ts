/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
import { sign } from 'jsonwebtoken';
import { JWT_TOKEN_SECRET_KEY } from 'src/config';
import { UserEntity } from 'src/users/user.entity';

export function generateJwtToken(user: UserEntity): string {
  const { id, username, email } = user;

  return sign({ id, username, email }, JWT_TOKEN_SECRET_KEY);
}
