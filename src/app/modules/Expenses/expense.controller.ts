import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ExpenseFilterableFields } from './expense.constant';
import { ExpenseService } from './expense.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ExpenseService.InsertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ExpenseFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await ExpenseService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense fetched',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  const result = await ExpenseService.GetDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense fetched',
    data: result,
  });
};

const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ExpenseService.UpdateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Updated',
    data: result,
  });
});

const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ExpenseService.DeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Deleted',
    data: result,
  });
});

export const ExpenseController = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
