import express from 'express';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.router';
const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
