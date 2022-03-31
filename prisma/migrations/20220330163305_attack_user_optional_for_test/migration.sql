-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_userId_fkey";

-- AlterTable
ALTER TABLE "Attack" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
