import express from 'express';
import { ExpenseRoutes } from '../modules/Expenses/expense.routes';
import { FeesManagementRoutes } from '../modules/FeesManagement/feesManagement.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  // ... routes
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/feesManagement',
    route: FeesManagementRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
