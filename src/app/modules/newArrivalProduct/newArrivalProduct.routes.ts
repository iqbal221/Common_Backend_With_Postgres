import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import validateRequest from '../../middlewares/validateRequest';
import { NewArrivalProductController } from './newArrivalProduct.controller';
import { NewArrivalProductValidation } from './newArrivalProduct.validation';

const router = express.Router();

router.post(
  '/',
  //auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = NewArrivalProductValidation.create.parse(
      JSON.parse(req.body.data)
    );
    return NewArrivalProductController.InsertIntoDB(req, res, next);
  }
);

// router.post(
//   '/',
//   validateRequest(NewArrivalProductValidation.create),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   NewArrivalProductController.InsertIntoDB
// );

router.get('/:id', NewArrivalProductController.GetDataById);
router.patch(
  '/:id',
  validateRequest(NewArrivalProductValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NewArrivalProductController.UpdateIntoDB
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NewArrivalProductController.DeleteFromDB
);
router.get('/', NewArrivalProductController.GetAllFromDB);

export const newArrivalProductRoutes = router;
