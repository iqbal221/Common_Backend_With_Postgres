import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FeesManagementFilterableFields } from './feesManagement.constant';
import { FeesManagementService } from './feesManagement.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FeesManagementService.InsertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fees Management created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FeesManagementFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await FeesManagementService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fees Management fetched',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  const result = await FeesManagementService.GetDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fees Management  fetched',
    data: result,
  });
};

const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FeesManagementService.UpdateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fees Management Updated',
    data: result,
  });
});

const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FeesManagementService.DeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fees Management Deleted',
    data: result,
  });
});

export const FeesManagementController = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  // GetmonthlyFeesDetails,
  UpdateIntoDB,
  DeleteFromDB,
};
