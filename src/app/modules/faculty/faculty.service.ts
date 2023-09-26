import { Faculty } from '@prisma/client';
import prisma from '../../../server';

export const createFacultyService = async (
  data: Faculty
): Promise<Faculty | null> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};
