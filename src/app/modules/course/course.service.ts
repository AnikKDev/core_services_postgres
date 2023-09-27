import prisma from '../../../server';
const insertIntoDB = async (data: any): Promise<any> => {
  const { prerequisiteCourses, ...otherCourseData } = data;

  const result = await prisma.course.create({
    data: otherCourseData,
  });
  if (prerequisiteCourses && prerequisiteCourses.length) {
    for (let i = 0; i < prerequisiteCourses.length; i++) {
      const createPreRequisite = await prisma.courseToPreRquisite.create({
        data: {
          courseId: result.id,
          prerequisiteId: prerequisiteCourses[i].courseId,
        },
      });
      console.log(createPreRequisite);
    }
  }
  return result;
};
export const CourseService = {
  insertIntoDB,
};
