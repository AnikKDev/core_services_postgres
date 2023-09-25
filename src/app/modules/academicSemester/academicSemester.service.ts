import { AcademicSemester } from '@prisma/client';
import prisma from '../../../server';

export const createAcademicSemesterService = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
