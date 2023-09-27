import { Building } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../server';
import { searchableBuildingItems } from './building.constant';
import { BuildingFilterFields } from './building.interface';
const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: BuildingFilterFields,
  pages: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { searchTerm, ...otherFilters } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pages);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: searchableBuildingItems.map(item => ({
        [item]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(otherFilters).length > 0) {
    andCondition.push({
      AND: Object.keys(otherFilters).map(key => ({
        [key]: (otherFilters as any)[key],
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.building.findMany({
    take: limit,
    skip,
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
  const total = await prisma.building.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const buildingService = {
  insertIntoDB,
  getAllFromDB,
};
