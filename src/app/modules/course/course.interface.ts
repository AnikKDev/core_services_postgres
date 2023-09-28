export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: boolean;
};
export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  prerequisiteCourses: IPrerequisiteCourseRequest[];
};
