import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateOneInDB
);

export default router;
