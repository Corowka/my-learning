/*
  Warnings:

  - You are about to drop the column `universityId` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[specialtyId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_universityId_fkey";

-- DropIndex
DROP INDEX "Test_universityId_key";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "universityId",
ADD COLUMN     "specialtyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Test_specialtyId_key" ON "Test"("specialtyId");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
