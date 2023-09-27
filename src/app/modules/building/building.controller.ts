import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { filterableBuildingItems } from './building.constant';
import { buildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableBuildingItems);
  const pages = pick(req.query, paginationFields);
  const result = await buildingService.getAllFromDB(filters, pages);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building got successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const buildingController = {
  getAllFromDB,
  insertIntoDB,
};
