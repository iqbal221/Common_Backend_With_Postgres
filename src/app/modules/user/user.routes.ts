import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin
);

export const userRoutes = router;
