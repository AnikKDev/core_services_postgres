/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../server';
import { asyncForeach } from '../../../shared/utils';
import {
  ICourseCreateData,
  IPrerequisiteCourseRequest,
} from './course.interface';
const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { prerequisiteCourses, ...otherCourseData } = data;
  const result = await prisma.course.create({
    data: {
      ...otherCourseData,
      preRequisite: {
        create: prerequisiteCourses.map((course: { courseId: string }) => ({
          prerequisiteId: course.courseId,
        })),
      },
    },
  });
  if (result) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: result.id,
      },

      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  return result;

  // transaction.
  /*  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: otherCourseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create new course');
    }
    if (prerequisiteCourses && prerequisiteCourses.length) {
      for (let i = 0; i < prerequisiteCourses.length; i++) {
        // const createPreRequisite =
        await transactionClient.courseToPreRquisite.create({
          data: {
            courseId: result.id,
            prerequisiteId: prerequisiteCourses[i].courseId,
          },
        });
      }
    }
    return result;
  }); */
  // return newCourse;
  /* if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },

      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  } */
  // throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create new course');
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

/// I intend to explore the update course functionalities in the upcoming module.

const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPreRquisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          prerequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateOneIntoDB = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { prerequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      const deletePrerequisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );

      const newPrerequisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      await asyncForeach(
        deletePrerequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPreRquisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  prerequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForeach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPreRquisite.create({
            data: {
              courseId: id,
              prerequisiteId: insertPrerequisite.courseId,
            },
          });
        }
      );
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return responseData;
};

export const CourseService = {
  insertIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateOneIntoDB,
};
