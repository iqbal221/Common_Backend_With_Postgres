import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllFromDB);
router.get('/:id', AdminController.getByIdFromDB);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateOneInDB
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.deleteByIdFromDB
);

export const adminRoutes = router;
