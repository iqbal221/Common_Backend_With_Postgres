import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ILoginUser, IUserLoginResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { userId, password } = payload;

  const isUserExist = await prisma.admin.findFirst({
    where: {
      userId,
      password,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //create access token & refresh token
  const { userId: adminId } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { adminId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const GetUser = async (
  userData: JwtPayload | null
): Promise<ILoginUser | null> => {
  const result = await prisma.admin.findFirst({
    where: {
      userId: userData?.userId,
    },
  });
  return result;
};

export const AuthService = {
  loginUser,
  GetUser,
};
