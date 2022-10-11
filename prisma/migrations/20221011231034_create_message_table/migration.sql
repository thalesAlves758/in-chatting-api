-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
