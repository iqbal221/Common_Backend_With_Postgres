import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthenticationController.refreshToken
// );

// router.post('/forgot-password', AuthenticationController.forgotPassword);
// router.post('/reset-password', AuthenticationController.resetPassword);

// router.post(
//   '/change-password',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.STUDENT,
//     ENUM_USER_ROLE.FACULTY
//   ),
//   validateRequest(AuthValidation.changePasswordZodSchema),
//   AuthenticationController.changePassword
// );

export const authRoutes = router;
