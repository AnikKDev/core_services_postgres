import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router: Router = Router();
router.get('/', AcademicDepartmentController.getAllFromDB);
// router.get('/:id', getAcademicSemesterByIdController);
router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.insertIntoDB
);

export default router;
