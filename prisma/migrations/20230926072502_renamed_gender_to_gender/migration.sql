/*
  Warnings:

  - Changed the type of `gender` on the `faculties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female', 'others');

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL;

-- DropEnum
DROP TYPE "Gender";
