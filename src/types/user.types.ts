import { User, Message } from '@prisma/client';

export type UserInfo = Omit<User, 'password'>;

export type UserWithMessages = UserInfo & {
  lastMessages: Message[];
};
