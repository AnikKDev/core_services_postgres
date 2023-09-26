import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFacultyController,
  getAcademicFacultyController,
} from './academicFaculty.controller';
import { createAcademicFacultyValidation } from './academicFaculty.validation';

const router = Router();
router.get('/', getAcademicFacultyController);
router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyValidation),
  createAcademicFacultyController
);
export default router;
