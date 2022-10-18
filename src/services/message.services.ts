import { insert } from '../repositories/message.repository';
import { findWithWhomThereWasChat } from '../repositories/user.repository';
import { MessageInsertData } from '../types/message.types';
import { UserWithMessages } from '../types/user.types';
import { encryptText } from '../utils/cryptr.utils';

export async function insertMessage(data: MessageInsertData): Promise<void> {
  await insert({ ...data, text: encryptText(data.text) });
}

export async function getChatsByUserId(
  userId: number
): Promise<UserWithMessages[]> {
  return findWithWhomThereWasChat(userId);
}
