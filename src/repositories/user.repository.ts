import { User } from '@prisma/client';
import { prisma } from '../database/connection';
import { SignUpInsertData } from '../types/auth.types';

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function insert(data: SignUpInsertData): Promise<void> {
  await prisma.user.create({ data });
}
