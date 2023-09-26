import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableOptions } from './academicFaculty.constant';
import {
  createAcademicFacultyService,
  getAllAcademicFaculty,
} from './academicFaculty.service';

export const createAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicFacultyService(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  }
);
export const getAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableOptions);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await getAllAcademicFaculty(filters, paginationOptions);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty got successfully',
      data: result,
    });
  }
);
