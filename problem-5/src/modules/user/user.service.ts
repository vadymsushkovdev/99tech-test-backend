import { isNil, omit } from 'lodash';

import { TCreateUser } from '@src/modules/user/types/create-user.type';
import { userRepository } from '@src/modules/user/user.repository';
import { hashPassword } from '@src/shared/utils/hash-password.util';
import { TChangePassword } from '@src/modules/user/types/change-password.type';
import { comparePassword } from '@src/shared/utils/compare-password.util';
import { TUser } from '@src/modules/user/types/user.type';
import { HttpException } from '@src/shared/exception/http-exception';

export const createUser = async (
  data: TCreateUser
): Promise<void> => {
  const { email, password } = data;

  const isUserExists = await userRepository.exists({
    where: { email },
  });

  if (isUserExists) {
    throw new HttpException(409, 'User already exists');
  }

  const passwordHash = await hashPassword(password);

  const user = userRepository.create({
    email,
    password: passwordHash,
  });

  await userRepository.save(user);
};

export const findAllUsers = async (): Promise<TUser[]> => {
  const users = await userRepository.find();

  return users.map(({ password, ...user }) => user);
};

export const findUserById = async (id: number): Promise<TUser> => {
  const user = await userRepository.findOne({ where: { id } });

  if (isNil(user)) {
    throw new HttpException(404, 'User not found');
  }

  return omit(user, 'password');
};

export const changePassword = async (
  data: TChangePassword
): Promise<void> => {
  const { newPassword, oldPassword, id } = data;

  const user = await userRepository.findOne({ where: { id } });

  if (isNil(user)) {
    throw new HttpException(404, 'User not found');
  }

  const isPasswordMatch = await comparePassword(
    oldPassword,
    user.password
  );

  if (!isPasswordMatch) {
    throw new HttpException(400, 'Incorrect old password');
  }

  user.password = await hashPassword(newPassword);

  await userRepository.save(user);
};

export const deleteUser = async (id: number): Promise<void> => {
  const user = await userRepository.findOne({ where: { id } });

  if (isNil(user)) {
    throw new HttpException(404, 'User not found');
  }

  await userRepository.delete(user);
};
