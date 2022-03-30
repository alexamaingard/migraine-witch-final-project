-- DropIndex
DROP INDEX "AttacksOnAuras_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnAuras_auraId_key";

-- DropIndex
DROP INDEX "AttacksOnEffects_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnEffects_effectId_key";

-- DropIndex
DROP INDEX "AttacksOnPainLocations_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnPainLocations_painLocationId_key";

-- DropIndex
DROP INDEX "AttacksOnReliefMethods_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnReliefMethods_reliefMethodId_key";

-- DropIndex
DROP INDEX "AttacksOnSymptoms_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnSymptoms_symptomId_key";

-- DropIndex
DROP INDEX "AttacksOnTriggers_attackId_key";

-- DropIndex
DROP INDEX "AttacksOnTriggers_triggerId_key";

-- AlterTable
ALTER TABLE "AttacksOnAuras" ADD CONSTRAINT "AttacksOnAuras_pkey" PRIMARY KEY ("attackId", "auraId");

-- AlterTable
ALTER TABLE "AttacksOnEffects" ADD CONSTRAINT "AttacksOnEffects_pkey" PRIMARY KEY ("attackId", "effectId");

-- AlterTable
ALTER TABLE "AttacksOnPainLocations" ADD CONSTRAINT "AttacksOnPainLocations_pkey" PRIMARY KEY ("attackId", "painLocationId");

-- AlterTable
ALTER TABLE "AttacksOnReliefMethods" ADD CONSTRAINT "AttacksOnReliefMethods_pkey" PRIMARY KEY ("attackId", "reliefMethodId");

-- AlterTable
ALTER TABLE "AttacksOnSymptoms" ADD CONSTRAINT "AttacksOnSymptoms_pkey" PRIMARY KEY ("attackId", "symptomId");

-- AlterTable
ALTER TABLE "AttacksOnTriggers" ADD CONSTRAINT "AttacksOnTriggers_pkey" PRIMARY KEY ("attackId", "triggerId");
