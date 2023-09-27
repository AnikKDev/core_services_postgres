import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();
router.post('/', CourseController.insertIntoDB);

export const courseRouter = router;
