import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterFilterableItems } from './academicSemester.constant';
import {
  createAcademicSemesterService,
  getAcademicSemesters,
} from './academicSemester.service';

export const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const retult = await createAcademicSemesterService(req.body);
    sendResponse<AcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester created successfully',
      data: retult,
    });
  }
);
export const getAcademicSemestersController = catchAsync(
  async (req: Request, res: Response) => {
    // taking filter items to filters from query
    const filters = pick(req.query, semesterFilterableItems);
    // taking pagination items to pagination options
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAcademicSemesters(filters, paginationOptions);
    sendResponse<AcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester found successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
