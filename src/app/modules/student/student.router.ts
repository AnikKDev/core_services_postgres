import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllFromDB);

router.get('/:id', StudentController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updatedIntoDB
);

router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);

export const studentRoutes = router;
