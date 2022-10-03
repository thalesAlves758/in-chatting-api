import { User } from '@prisma/client';

export type SignUpInsertData = Omit<User, 'id'>;

export type SignUpBody = SignUpInsertData & { confirmPassword: string };
