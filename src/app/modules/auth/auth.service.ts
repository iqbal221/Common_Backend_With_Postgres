import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ILoginUser, IUserLoginResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { userId, password, role } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
      password,
      role,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //create access token & refresh token
  const { userId: id, role: userRole } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, userRole },
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
  const result = await prisma.user.findFirst({
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
