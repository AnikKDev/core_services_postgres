import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../server';

const insertIntoDB = async (
  data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const doesOfferCourseExist = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });
  if (!doesOfferCourseExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "OfferedCourse doesn't exist");
  }
  const { semesterRegistrationId } = doesOfferCourseExist;
  const result = await prisma.offeredCourseSection.create({
    data: {
      ...data,
      semesterRegistrationId,
    },
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });
  return result;
};

export const offeredCourseSectionService = {
  insertIntoDB,
};
