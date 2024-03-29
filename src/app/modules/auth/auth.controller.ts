/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = async (req, res, next) => {
  const { ...loginData } = req.body;
  try {
    const result = await AuthService.loginUser(loginData);

    res.json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User login successfully',
    });
  } catch (err) {
    next(err);
  }
};

const GetUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthService.GetUser(req.user);

    res.json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User fetch successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  loginUser,
  GetUser,
};
