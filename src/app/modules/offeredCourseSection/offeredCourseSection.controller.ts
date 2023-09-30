import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionService } from './offeredCourseSection.service';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await offeredCourseSectionService.insertIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'offered course section created successfully',
      data: result,
    });
  }
);
export const offeredCourseSectionController = {
  insertIntoDB,
};
