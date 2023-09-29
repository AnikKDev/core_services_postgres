/*
  Warnings:

  - Made the column `status` on table `semester_registrations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "semester_registrations" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
