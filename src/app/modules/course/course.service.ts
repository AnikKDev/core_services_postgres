import prisma from '../../../server';
import { ICourseCreateData } from './course.interface';
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
export const CourseService = {
  insertIntoDB,
};
