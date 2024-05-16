import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.data);
    req.body = StudentValidation.create.parse(JSON.parse(req.body.data));
    return StudentController.InsertIntoDB(req, res, next);
  }
);

// router.post(
//   '/',
//   validateRequest(StudentValidation.create),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.InsertIntoDB
// );

// router.get('/:id', StudentController.GetDataById);
// router.patch(
//   '/:id',
//   validateRequest(StudentValidation.update),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.UpdateIntoDB
// );
// router.delete(
//   '/:id',
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.DeleteFromDB
// );

router.get('/', StudentController.GetAllFromDB);

export const StudentRoutes = router;
