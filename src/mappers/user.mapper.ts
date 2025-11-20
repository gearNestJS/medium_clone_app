import { UserResponseInterface } from 'src/users/interfaces/user-response.interface';
import { UserEntity } from 'src/users/user.entity';
import { generateJwtToken } from 'src/utils/gemerate-jwt-token.util';

export function userMapper(user: UserEntity): UserResponseInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, id, ...rest } = user;

  return {
    user: {
      ...rest,
      token: generateJwtToken(user),
    },
  };
}
