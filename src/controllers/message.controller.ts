import { Request, Response } from 'express';
import { getChatsByUserId } from '../services/message.services';
import { UserInfo } from '../types/user.types';

export async function getChats(req: Request, res: Response) {
  const user: UserInfo = res.locals.user;

  const chats = await getChatsByUserId(user.id);

  res.send(chats);
}
