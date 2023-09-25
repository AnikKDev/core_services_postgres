import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicSemesterController,
  getAcademicSemestersController,
} from './academicSemester.controller';
import { academicSemesterZodValidation } from './academicSemester.validation';

const router: Router = Router();
router.get('/academic-semesters', getAcademicSemestersController);
router.post(
  '/create-semester',
  validateRequest(academicSemesterZodValidation),
  createAcademicSemesterController
);

export default router;
