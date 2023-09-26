import express from 'express';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.router';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
import facultyRouter from '../modules/faculty/faculty.router';
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
    route: academicFacultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
