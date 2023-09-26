import { Student } from '@prisma/client';
import prisma from '../../../server';

export const createStudentService = async (
  data: Student
): Promise<Student | null> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};
