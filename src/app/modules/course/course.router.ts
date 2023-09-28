import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CourseController } from './course.controller';

const router = Router();
router.post('/', CourseController.insertIntoDB);
router.get('/:id', CourseController.getByIdFromDB);
router.patch('/:id', CourseController.updateOneInDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.deleteByIdFromDB
);
export const courseRouter = router;
