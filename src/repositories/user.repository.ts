import { User } from '@prisma/client';
import { prisma } from '../database/connection';
import { SignUpInsertData } from '../types/auth.types';
import { UserWithMessages } from '../types/user.types';

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function insert(data: SignUpInsertData): Promise<void> {
  await prisma.user.create({ data });
}

export async function findWithWhomThereWasChat(
  currentUserId: number
): Promise<UserWithMessages[]> {
  return prisma.$queryRaw<UserWithMessages[]>`
    SELECT
      "users"."id",
      "users"."firstName",
      "users"."lastName",
      "users"."email",
      "users"."photoUrl",
      ARRAY (
        SELECT row_to_json ("messageRow")
        FROM (
          SELECT * FROM "messages" "innerMessages"
          WHERE ("innerMessages"."toUserId" = "users"."id" AND "innerMessages"."fromUserId" = ${currentUserId}) OR ("innerMessages"."toUserId" = ${currentUserId} AND "innerMessages"."fromUserId" = "users"."id")
          ORDER BY "innerMessages"."sentAt" DESC
          LIMIT CASE WHEN NOT EXISTS (
            SELECT * FROM "messages"
            WHERE ("messages"."toUserId" = "users"."id" AND "messages"."fromUserId" = ${currentUserId}) OR ("messages"."toUserId" = ${currentUserId} AND "messages"."fromUserId" = "users"."id") AND "messages"."sawAt" IS NULL
          ) THEN 1 END
        ) "messageRow"
      ) "lastMessages"
    FROM "users", "messages"
    WHERE "messages"."id" = (
      SELECT "messages".id
      FROM "messages"
      WHERE ("messages"."toUserId" = "users"."id" AND "messages"."fromUserId" = ${currentUserId}) OR ("messages"."toUserId" = ${currentUserId} AND "messages"."fromUserId" = "users"."id")
      ORDER BY "messages"."sentAt" DESC
      LIMIT 1
    )
    ORDER BY "messages"."sentAt" DESC
  `;
}
