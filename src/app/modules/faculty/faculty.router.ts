import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyController } from './faculty.controller';
import { createFacultyValidation } from './faculty.validation';

const router = Router();
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidation),
  createFacultyController
);
export default router;
