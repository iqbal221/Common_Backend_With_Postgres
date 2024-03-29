import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { newArrivalProductRoutes } from '../modules/newArrivalProduct/newArrivalProduct.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  // ... routes
  {
    path: '/new-arrival-product',
    route: newArrivalProductRoutes,
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
