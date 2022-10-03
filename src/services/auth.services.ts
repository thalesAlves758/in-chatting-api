import { User } from '@prisma/client';
import { conflictError } from '../exceptions/http.exceptions';
import { findByEmail, insert } from '../repositories/user.repository';
import { SignUpInsertData } from '../types/auth.types';
import { encryptPassword } from '../utils/bcrypt.utils';

export async function getUserByEmail(email: string): Promise<User | null> {
  return findByEmail(email);
}

export async function registerUser(data: SignUpInsertData): Promise<void> {
  const { email, password } = data;

  const user: User | null = await getUserByEmail(email);

  if (user) {
    throw conflictError('email already in use');
  }

  await insert({ ...data, password: encryptPassword(password) });
}
