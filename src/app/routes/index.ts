import express from 'express';
import academicDepartmentRouter from '../modules/academicDepartment/academicDepartment.router';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
import { buildingRouter } from '../modules/building/building.router';
import { facultyRouter } from '../modules/faculty/faculty.router';
import { roomRouter } from '../modules/room/room.router';
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
  {
    path: '/building',
    route: buildingRouter,
  },
  {
    path: '/room',
    route: roomRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
