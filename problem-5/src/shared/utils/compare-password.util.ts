import { compare } from 'bcrypt';

export const comparePassword = async (
  password: string,
  hash: string
) => {
  return await compare(password, hash);
};
