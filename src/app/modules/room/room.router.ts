import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { roomController } from './room.controller';
import { roomValidation } from './room.validation';

const router = Router();
router.post(
  '/',
  validateRequest(roomValidation.create),
  roomController.insertIntoDB
);

export const roomRouter = router;
