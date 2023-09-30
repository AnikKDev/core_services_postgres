import { Router } from 'express';
import { offeredCourseSectionController } from './offeredCourseSection.controller';

const router: Router = Router();
router.post('/', offeredCourseSectionController.insertIntoDB);

export const offeredCourseSectionRouter = router;
