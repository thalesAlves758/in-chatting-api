-- AlterTable
ALTER TABLE "users" ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "photoUrl" SET DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
