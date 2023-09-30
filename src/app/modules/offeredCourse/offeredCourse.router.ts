import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseController } from './offeredCourse.controller';
import { offeredCourseValidation } from './offeredCourse.validation';

const router: Router = Router();
router.post(
  '/',
  validateRequest(offeredCourseValidation.create),
  offeredCourseController.insertIntoDB
);

export const offeredCourseRouter = router;
