import { User } from '@prisma/client';
import {
  conflictError,
  unauthorizedError,
} from '../exceptions/http.exceptions';
import { findByEmail, findById, insert } from '../repositories/user.repository';
import {
  AuthJwtPayload,
  SignInBody,
  SignInResponse,
  SignUpInsertData,
} from '../types/auth.types';
import { comparePassword, encryptPassword } from '../utils/bcrypt.utils';
import { generateToken, validateToken } from '../utils/jwt.utils';

export async function getUserByEmail(email: string): Promise<User | null> {
  return findByEmail(email);
}

export async function getUserById(id: number): Promise<User | null> {
  return findById(id);
}

export async function registerUser(data: SignUpInsertData): Promise<void> {
  const { email, password } = data;

  const user: User | null = await getUserByEmail(email);

  if (user) {
    throw conflictError('email already in use');
  }

  await insert({ ...data, password: encryptPassword(password) });
}

export async function signInUser({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const user: User | null = await getUserByEmail(email);

  if (!user || !comparePassword(user.password, password)) {
    throw unauthorizedError('Wrong email or password');
  }

  const token: string = generateToken<AuthJwtPayload>({ id: user.id });

  return {
    token,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
  };
}

export async function getUserByToken(token: string): Promise<User | null> {
  const decoded = validateToken<AuthJwtPayload>(token);

  if (!decoded) {
    return null;
  }

  return getUserById(decoded.id);
}
