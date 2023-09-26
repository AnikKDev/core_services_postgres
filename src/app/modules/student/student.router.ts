import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);

router.get('/', StudentController.getAllFromDB);

router.get('/:id', StudentController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updatedIntoDB
);
router.delete('/:id', StudentController.deleteFromDB);

export const studentRoutes = router;
