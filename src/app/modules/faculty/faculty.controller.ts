import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createFacultyService } from './faculty.service';

export const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createFacultyService(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty created successfully',
      data: result,
    });
  }
);
