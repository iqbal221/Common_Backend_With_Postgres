import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUser),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createUser
);

export const userRoutes = router;
