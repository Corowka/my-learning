/*
  Warnings:

  - A unique constraint covering the columns `[facultyId]` on the table `ExtraFacultyInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[specialtyId]` on the table `ExtraSpecialtyInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[universityId]` on the table `ExtraUniversityInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[universityId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facultyId]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[universityId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExtraFacultyInfo_facultyId_key" ON "ExtraFacultyInfo"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraSpecialtyInfo_specialtyId_key" ON "ExtraSpecialtyInfo"("specialtyId");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraUniversityInfo_universityId_key" ON "ExtraUniversityInfo"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_universityId_key" ON "Faculty"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_facultyId_key" ON "Specialty"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_universityId_key" ON "Test"("universityId");
