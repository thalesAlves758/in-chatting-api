import { User } from '@prisma/client';

export type SignUpInsertData = Omit<User, 'id'>;

export type SignUpBody = SignUpInsertData & { confirmPassword: string };

export type SignInBody = Pick<User, 'email' | 'password'>;

export type SignInResponse = Omit<User, 'password'> & { token: string };

export type AuthJwtPayload = Pick<User, 'id'>;
