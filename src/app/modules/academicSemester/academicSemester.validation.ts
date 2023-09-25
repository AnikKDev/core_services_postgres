import { z } from 'zod';

export const academicSemesterZodValidation = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is required',
    }),
    title: z.string({ required_error: 'Title is required' }),
    code: z.string({ required_error: 'Code is required' }),
    startMonth: z.string({ required_error: 'Start month is required' }),
    endMonth: z.string({ required_error: 'End month is required' }),
  }),
});
