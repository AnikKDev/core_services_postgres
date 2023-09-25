import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicSemesterController } from './academicSemester.controller';
import { academicSemesterZodValidation } from './academicSemester.validation';

const router: Router = Router();
router.post(
  '/create-semester',
  validateRequest(academicSemesterZodValidation),
  createAcademicSemesterController
);

export default router;
