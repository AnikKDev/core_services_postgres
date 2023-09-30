import { OfferedCourse } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../server';
import { asyncForeach } from '../../../shared/utils';
import { OfferedCourseType } from './offeredCourse.interface';

const insertIntoDB = async (
  data: OfferedCourseType
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, courseIds, semesterRegistrationId } = data;

  const result: OfferedCourse[] = [];
  await asyncForeach(courseIds, async (courseId: string) => {
    const isExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });
    if (!isExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          course: true,
          semesterRegistration: true,
        },
      });
      result.push(insertOfferedCourse);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Data already exists');
    }
  });
  return result;
};

export const offeredCourseService = {
  insertIntoDB,
};
