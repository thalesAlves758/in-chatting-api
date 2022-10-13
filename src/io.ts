import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { getUserById, getUserByToken } from './services/auth.services';
import { UserInfo } from './types/user.types';
import { User } from '@prisma/client';
import {
  MessageInsertData,
  MessageReceived,
  MessageSent,
} from './types/message.types';
import { insertMessage } from './services/message.services';
import {
  badRequestError,
  internalServerError,
  notFoundError,
  unauthorizedError,
} from './exceptions/http.exceptions';
import { IoEvents } from './types/io.types';

dotenv.config();

async function getSocketIdByUserId(
  io: Server,
  userId: number
): Promise<string | null> {
  const sockets = await io.fetchSockets();

  const foundSocket = sockets.find((socket) => socket.data.id === userId);

  return foundSocket?.id ?? null;
}

async function getUser(token: string | undefined): Promise<UserInfo> {
  if (!token) {
    throw unauthorizedError();
  }

  const user = (await getUserByToken(token)) as Partial<User> | null;

  if (!user) {
    throw unauthorizedError();
  }

  delete user?.password;

  return user as UserInfo;
}

async function validateMessage(data: MessageInsertData): Promise<void> {
  const to = await getUserById(data.toUserId);

  if (!to) {
    throw notFoundError('Specified user not found');
  }

  if (data.fromUserId === data.toUserId) {
    throw badRequestError('Unable to send a message to yourself');
  }
}

async function validateUser(socket: Socket): Promise<void> {
  try {
    socket.data = await getUser(socket.handshake.auth.token);
  } catch (error) {
    socket.emit(IoEvents.CONNECTION_ERROR, unauthorizedError());
    socket.disconnect();
  }
}

function initIoHandlers(io: Server): void {
  io.on(IoEvents.CONNECTION, async (socket: Socket) => {
    await validateUser(socket);

    socket.on(IoEvents.PRIVATE_MESSAGE, async (data: MessageSent) => {
      try {
        const messageData: MessageInsertData = {
          ...data,
          fromUserId: socket.data.id,
        };

        await validateMessage(messageData);
        await insertMessage(messageData);

        socket.emit(IoEvents.MESSAGE_SUCCESS);

        const toSocketId = await getSocketIdByUserId(io, data.toUserId);

        if (toSocketId) {
          const receivedMessage: MessageReceived = {
            text: data.text,
            sentAt: data.sentAt,
            fromUserId: socket.data.id,
          };

          io.to(toSocketId).emit(
            IoEvents.RECEIVED_PRIVATE_MESSAGE,
            receivedMessage
          );
        }
      } catch (error: any) {
        if (!error.type) {
          socket.emit(IoEvents.MESSAGE_ERROR, internalServerError());
          return;
        }

        socket.emit(IoEvents.MESSAGE_ERROR, error);
      }
    });
  });
}

export function initIo(server: http.Server): void {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN_URL,
    },
  });

  initIoHandlers(io);
}
