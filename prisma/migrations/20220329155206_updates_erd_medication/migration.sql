/*
  Warnings:

  - You are about to drop the column `doseId` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `drugId` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the `Dose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Drug` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dose` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drug` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_doseId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_drugId_fkey";

-- DropIndex
DROP INDEX "Medication_doseId_key";

-- DropIndex
DROP INDEX "Medication_drugId_key";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "doseId",
DROP COLUMN "drugId",
ADD COLUMN     "dose" INTEGER NOT NULL,
ADD COLUMN     "drug" TEXT NOT NULL;

-- DropTable
DROP TABLE "Dose";

-- DropTable
DROP TABLE "Drug";
