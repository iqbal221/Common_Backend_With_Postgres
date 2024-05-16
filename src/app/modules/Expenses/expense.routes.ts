import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseController } from './expense.controller';
import { ExpenseValidation } from './expense.validation';
// import { FileUploadHelper } from '../../../../helpers/FileUploadHelper';
// import { monthlyFeesController } from './monthlyFees.controller';
// import { MonthlyFeesValidation } from './monthlyFees.validation';

const router = express.Router();

// router.post(
//   '/',
//   // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   FileUploadHelper.upload.array('file', 4),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.body.data);
//     req.body = MonthlyFeesValidation.create.parse(JSON.parse(req.body.data));
//     return monthlyFeesController.InsertIntoDB(req, res, next);
//   }
// );

router.post(
  '/',
  validateRequest(ExpenseValidation.create),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExpenseController.InsertIntoDB
);

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
// router.get('/studentDetails', StudentController.GetStudentDetails);
router.get('/', ExpenseController.GetAllFromDB);

export const ExpenseRoutes = router;
