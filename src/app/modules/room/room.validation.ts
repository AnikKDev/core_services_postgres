import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'room number is required',
    }),
    floor: z.string({
      required_error: 'floor is required',
    }),
    buildingId: z.string({
      required_error: 'building id is required',
    }),
  }),
});

export const roomValidation = {
  create,
};
