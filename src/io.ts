import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { getUserByToken } from './services/auth.services';
import { UserInfo } from './types/user.types';
import { User } from '@prisma/client';

dotenv.config();

async function validateUser(socket: Socket) {
  const { token } = socket.handshake.auth;

  if (!token) {
    socket.disconnect();
    return;
  }

  const user = (await getUserByToken(token)) as Partial<User> | null;

  if (!user) {
    socket.disconnect();
  }

  delete user?.password;

  socket.data = user as UserInfo;
}

function initIoHandlers(io: Server): void {
  io.on('connection', async (socket: Socket) => {
    await validateUser(socket);
  });
}

export function initIo(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN_URL,
    },
  });

  initIoHandlers(io);
}
