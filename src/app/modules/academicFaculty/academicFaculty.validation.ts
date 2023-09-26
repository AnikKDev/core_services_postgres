import { z } from 'zod';

export const createAcademicFacultyValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Please enter academic faculty title' }),
  }),
});
