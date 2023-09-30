import { Router } from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = Router();
router.post('/', OfferedCourseClassScheduleController.insertIntoDB);

export const offeredCourseClassScheduleRouter = router;
