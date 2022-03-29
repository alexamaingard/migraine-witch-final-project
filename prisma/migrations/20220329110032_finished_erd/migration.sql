-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "intensityId" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "physicalLocationId" INTEGER NOT NULL,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intensity" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intensity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drugId" INTEGER NOT NULL,
    "doseId" INTEGER NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drug" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dose" (
    "id" SERIAL NOT NULL,
    "milligrams" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhysicalLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attackId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnSymptoms" (
    "attackId" INTEGER NOT NULL,
    "symptomId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnTriggers" (
    "attackId" INTEGER NOT NULL,
    "triggerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnEffects" (
    "attackId" INTEGER NOT NULL,
    "effectId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PreSymptom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreSymptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnPreSymptoms" (
    "attackId" INTEGER NOT NULL,
    "preSymptomId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ReliefMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReliefMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnReliefMethods" (
    "attackId" INTEGER NOT NULL,
    "reliefMethodId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PainLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PainLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttacksOnPainLocations" (
    "attackId" INTEGER NOT NULL,
    "painLocationId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Intensity_number_key" ON "Intensity"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_drugId_key" ON "Medication"("drugId");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_doseId_key" ON "Medication"("doseId");

-- CreateIndex
CREATE UNIQUE INDEX "Drug_name_key" ON "Drug"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dose_milligrams_key" ON "Dose"("milligrams");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalLocation_name_key" ON "PhysicalLocation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Note_attackId_key" ON "Note"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "Symptom_name_key" ON "Symptom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnSymptoms_attackId_key" ON "AttacksOnSymptoms"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnSymptoms_symptomId_key" ON "AttacksOnSymptoms"("symptomId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_name_key" ON "Trigger"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnTriggers_attackId_key" ON "AttacksOnTriggers"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnTriggers_triggerId_key" ON "AttacksOnTriggers"("triggerId");

-- CreateIndex
CREATE UNIQUE INDEX "Effect_name_key" ON "Effect"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnEffects_attackId_key" ON "AttacksOnEffects"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnEffects_effectId_key" ON "AttacksOnEffects"("effectId");

-- CreateIndex
CREATE UNIQUE INDEX "PreSymptom_name_key" ON "PreSymptom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnPreSymptoms_attackId_key" ON "AttacksOnPreSymptoms"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnPreSymptoms_preSymptomId_key" ON "AttacksOnPreSymptoms"("preSymptomId");

-- CreateIndex
CREATE UNIQUE INDEX "ReliefMethod_name_key" ON "ReliefMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnReliefMethods_attackId_key" ON "AttacksOnReliefMethods"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnReliefMethods_reliefMethodId_key" ON "AttacksOnReliefMethods"("reliefMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "PainLocation_location_key" ON "PainLocation"("location");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnPainLocations_attackId_key" ON "AttacksOnPainLocations"("attackId");

-- CreateIndex
CREATE UNIQUE INDEX "AttacksOnPainLocations_painLocationId_key" ON "AttacksOnPainLocations"("painLocationId");

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_intensityId_fkey" FOREIGN KEY ("intensityId") REFERENCES "Intensity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_physicalLocationId_fkey" FOREIGN KEY ("physicalLocationId") REFERENCES "PhysicalLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_doseId_fkey" FOREIGN KEY ("doseId") REFERENCES "Dose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnSymptoms" ADD CONSTRAINT "AttacksOnSymptoms_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnSymptoms" ADD CONSTRAINT "AttacksOnSymptoms_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnTriggers" ADD CONSTRAINT "AttacksOnTriggers_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnTriggers" ADD CONSTRAINT "AttacksOnTriggers_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnEffects" ADD CONSTRAINT "AttacksOnEffects_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnEffects" ADD CONSTRAINT "AttacksOnEffects_effectId_fkey" FOREIGN KEY ("effectId") REFERENCES "Effect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnPreSymptoms" ADD CONSTRAINT "AttacksOnPreSymptoms_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnPreSymptoms" ADD CONSTRAINT "AttacksOnPreSymptoms_preSymptomId_fkey" FOREIGN KEY ("preSymptomId") REFERENCES "PreSymptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnReliefMethods" ADD CONSTRAINT "AttacksOnReliefMethods_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnReliefMethods" ADD CONSTRAINT "AttacksOnReliefMethods_reliefMethodId_fkey" FOREIGN KEY ("reliefMethodId") REFERENCES "ReliefMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnPainLocations" ADD CONSTRAINT "AttacksOnPainLocations_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "Attack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttacksOnPainLocations" ADD CONSTRAINT "AttacksOnPainLocations_painLocationId_fkey" FOREIGN KEY ("painLocationId") REFERENCES "PainLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
