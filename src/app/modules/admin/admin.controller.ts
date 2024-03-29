import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.getAllFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Admin fetched',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin fetched',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneInDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { payload } = req.body;
  try {
    const result = await AdminService.updateOneInDB(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deleteByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
