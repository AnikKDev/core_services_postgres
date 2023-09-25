import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createAcademicSemesterService } from './academicSemester.service';

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
