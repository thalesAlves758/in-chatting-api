import { prisma } from '../database/connection';
import { MessageInsertData } from '../types/message.types';

export async function insert(data: MessageInsertData): Promise<void> {
  await prisma.message.create({ data });
}
