import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await offeredCourseService.insertIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'offered course created successfully',
      data: result,
    });
  }
);
export const offeredCourseController = {
  insertIntoDB,
};
