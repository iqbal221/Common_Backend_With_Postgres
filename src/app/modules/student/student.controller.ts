import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.InsertIntoDB(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StudentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await StudentService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data fetched',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  const result = await StudentService.GetDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Single data fetched',
    data: result,
  });
};

const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.UpdateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data Updated',
    data: result,
  });
});

const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.DeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data Deleted',
    data: result,
  });
});

export const StudentController = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
