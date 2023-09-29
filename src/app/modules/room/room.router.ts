import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { roomValidation } from './room.validation';

const router = Router();
router.post(
  '/',
  validateRequest(roomValidation.create),
  RoomController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.updateOneInDB
);
router.get('/:id', RoomController.getByIdFromDB);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.deleteByIdFromDB
);
export const roomRouter = router;
