import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../server';
import { academicFacultySearchableOptions } from './academicFaculty.constant';
import { IAcademicFacultyFilterType } from './academicFaculty.interface';

export const createAcademicFacultyService = async (
  data: AcademicFaculty
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

export const getAllAcademicFaculty = async (
  filters: IAcademicFacultyFilterType,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...otherFilterOptions } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: academicFacultySearchableOptions.map(item => ({
        [item]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(otherFilterOptions).length > 0) {
    andCondition.push({
      AND: Object.keys(otherFilterOptions).map(key => ({
        [key]: {
          equals: (otherFilterOptions as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicFacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicFaculty.findMany({
    skip,
    take: limit,
    where: whereCondition,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const totalData = await prisma.academicFaculty.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      skip,
      total: totalData,
    },
    data: result,
  };
};
