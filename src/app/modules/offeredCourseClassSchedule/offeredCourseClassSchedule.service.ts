import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../server';
import { OfferedCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await OfferedCourseClassScheduleUtils.checkRoomAvailability(data);
  const result = await prisma.offeredCourseClassSchedule.create({
    data: data,
    include: {
      faculty: true,
      offeredCourseSection: true,
      room: true,
      semesterRegistration: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  insertIntoDB,
};
