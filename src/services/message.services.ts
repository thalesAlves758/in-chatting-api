import { insert } from '../repositories/message.repository';
import { MessageInsertData } from '../types/message.types';
import { encryptText } from '../utils/cryptr.utils';

export async function insertMessage(data: MessageInsertData): Promise<void> {
  await insert({ ...data, text: encryptText(data.text) });
}
