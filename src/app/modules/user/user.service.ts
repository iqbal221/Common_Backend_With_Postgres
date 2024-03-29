import { Admin } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createAdmin = async (data: Admin): Promise<Admin> => {
  const result = await prisma.admin.create({
    data,
  });
  return result;
};

export const UserService = {
  createAdmin,
};
