import { Message } from '@prisma/client';

export type MessageSent = Omit<Message, 'id' | 'fromUserId' | 'sawAt'>;

export type MessageInsertData = Omit<Message, 'id'>;

export type MessageReceived = Omit<Message, 'id' | 'toUserId' | 'sawAt'>;
