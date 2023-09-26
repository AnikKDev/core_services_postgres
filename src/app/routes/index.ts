import express from 'express';
import academicDepartmentRouter from '../modules/academicDepartment/academicDepartment.router';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
import { facultyRouter } from '../modules/faculty/faculty.router';
import { studentRoutes } from '../modules/student/student.router';
const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
