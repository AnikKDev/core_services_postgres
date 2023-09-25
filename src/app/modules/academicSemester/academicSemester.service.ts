import { AcademicSemester, Prisma } from '@prisma/client';
import {
  IOptionsResult,
  paginationHelpers,
} from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../server';
import { semesterSearchableItems } from './academicSemester.constant';
import { IAcademicSemesterFilters } from './academicSemester.interface';

export const createAcademicSemesterService = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

export const getAcademicSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: Partial<IOptionsResult>
): Promise<IGenericResponse<AcademicSemester[]>> => {
  // for pagination
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // for searching
  const { searchTerm, ...otherFilterOptions } = filters;
  // for filter
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: semesterSearchableItems.map(field => ({
        [field]: {
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
  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicSemester.findMany({
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
  const totalData = await prisma.academicSemester.count();

  return {
    meta: {
      total: totalData,
      page,
      limit,
    },
    data: result,
  };
};

export const getAcademicSemesterById = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
