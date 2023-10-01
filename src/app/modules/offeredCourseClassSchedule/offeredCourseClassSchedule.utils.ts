import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../server';
import { hasTimeConflict } from '../../../shared/utils';

const checkRoomAvailability = async (data: OfferedCourseClassSchedule) => {
  const doesClassScheduleExist =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        roomId: data.roomId,
      },
    });
  const existingSchedules = doesClassScheduleExist.map(item => ({
    startTime: item.startTime,
    endTime: item.endTime,
    dayOfWeek: item.dayOfWeek,
  }));
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };
  if (hasTimeConflict(existingSchedules, newSlot)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Room is already booked for this schedule'
    );
  }
};

const checkFacultyAvaialble = async (data: OfferedCourseClassSchedule) => {
  const assignedFaculty = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      faculty: {
        id: data.facultyId,
      },
    },
  });

  const existingSchedules = assignedFaculty.map(item => ({
    startTime: item.startTime,
    endTime: item.endTime,
    dayOfWeek: item.dayOfWeek,
  }));
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };
  if (hasTimeConflict(existingSchedules, newSlot)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Faculty is already booked for this schedule'
    );
  }
  console.log(assignedFaculty);
};

export const OfferedCourseClassScheduleUtils = {
  checkRoomAvailability,
  checkFacultyAvaialble,
};
