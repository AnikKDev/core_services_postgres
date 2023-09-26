import { z } from 'zod';

export const createFacultyValidation = z.object({
  body: z.object({
    facultyId: z.string({ required_error: 'Please enter your faculty ID' }),
    firstName: z.string({ required_error: 'Please enter your first name' }),
    middleName: z.string({ required_error: 'Please enter your middle name' }),
    lastName: z.string({ required_error: 'Please enter your last name' }),
    profileImage: z.string({
      required_error: 'Please enter your profile image URL',
    }),
    email: z.string({ required_error: 'Please enter your email' }),
    contactNo: z.number({ required_error: 'Please enter your contact info' }),
    gender: z.enum(['male', 'female'], {
      required_error: 'Please enter your gender',
    }),
    bloodGroup: z.string({ required_error: 'Please enter your blood group' }),
    designation: z.string({ required_error: 'Please enter your designation' }),
    academicDepartmentId: z.string({
      required_error: 'Please enter your academic department id',
    }),
    academicFacultyId: z.string({
      required_error: 'Please enter your Academic faculty id',
    }),
  }),
});
