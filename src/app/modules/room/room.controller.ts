import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { roomService } from './room.service';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await roomService.insertIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room added successfully',
      data: result,
    });
  }
);
export const roomController = {
  insertIntoDB,
};
