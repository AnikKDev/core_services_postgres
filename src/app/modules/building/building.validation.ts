import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title id is required',
    }),
  }),
});

/* const update = z.object({
  body: z.object({
    facultyId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    designation: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

const assignOrRemoveCourses = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Courses are required',
    }),
  }),
}); */

export const buildingValidation = {
  create,
  /*  update,
  assignOrRemoveCourses, */
};
