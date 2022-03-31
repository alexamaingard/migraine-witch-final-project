/*
  Warnings:

  - You are about to drop the column `attackId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `AttacksOnPreSymptoms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PreSymptom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[noteId]` on the table `Attack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noteId` to the `Attack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttacksOnPreSymptoms" DROP CONSTRAINT "AttacksOnPreSymptoms_attackId_fkey";

-- DropForeignKey
ALTER TABLE "AttacksOnPreSymptoms" DROP CONSTRAINT "AttacksOnPreSymptoms_preSymptomId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_attackId_fkey";

-- DropIndex
DROP INDEX "Note_attackId_key";

-- AlterTable
ALTER TABLE "Attack" ADD COLUMN     "noteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "attackId";

-- DropTable
DROP TABLE "AttacksOnPreSymptoms";

-- DropTable
DROP TABLE "PreSymptom";

-- CreateTable
CREATE TABLE "Aura" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnAuras" (
    "attackId" INTEGER NOT NULL,
    "auraId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aura_name_key" ON "Aura"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnAuras_attackId_key" ON "AttacksOnAuras"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnAuras_auraId_key" ON "AttacksOnAuras"("auraId");

-- CreateIndex
CREATE UNIQUE INDEX "Attack_noteId_key" ON "Attack"("noteId");

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnAuras" ADD CONSTRAINT "AttacksOnAuras_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnAuras" ADD CONSTRAINT "AttacksOnAuras_auraId_fkey" FOREIGN KEY ("auraId") REFERENCES "Aura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
