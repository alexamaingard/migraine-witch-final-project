-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_intensityId_fkey";

-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_physicalLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Attack" DROP CONSTRAINT "Attack_typeId_fkey";

-- AlterTable
ALTER TABLE "Attack" ALTER COLUMN "intensityId" DROP NOT NULL,
ALTER COLUMN "medicationId" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL,
ALTER COLUMN "physicalLocationId" DROP NOT NULL,
ALTER COLUMN "noteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_intensityId_fkey" FOREIGN KEY ("intensityId") REFERENCES "Intensity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_physicalLocationId_fkey" FOREIGN KEY ("physicalLocationId") REFERENCES "PhysicalLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
