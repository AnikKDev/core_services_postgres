import { Room } from '@prisma/client';
import prisma from '../../../server';

const insertIntoDB = async (data: Room): Promise<Room | null> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};
export const roomService = {
  insertIntoDB,
};
