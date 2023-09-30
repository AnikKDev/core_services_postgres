/*
  Warnings:

  - You are about to drop the column `endtime` on the `offered_course_class_schedules` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `offered_course_class_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offered_course_class_schedules" DROP COLUMN "endtime",
ADD COLUMN     "endTime" TEXT NOT NULL;
