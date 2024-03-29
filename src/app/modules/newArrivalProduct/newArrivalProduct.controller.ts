import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NewArrivalProductFilterableFields } from './newArrivalProduct.constant';
import { NewArrivalProductService } from './newArrivalProduct.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await NewArrivalProductService.InsertIntoDB(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Arrival Product created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, NewArrivalProductFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await NewArrivalProductService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Arrival Product fetched',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  const result = await NewArrivalProductService.GetDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Arrival Single Product fetched',
    data: result,
  });
};

const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await NewArrivalProductService.UpdateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Arrival Product Updated',
    data: result,
  });
});

const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await NewArrivalProductService.DeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Arrival Product Deleted',
    data: result,
  });
});

export const NewArrivalProductController = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
