import { Admin } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const getAllFromDB = async (): Promise<Admin[]> => {
  const result = await prisma.admin.findMany();
  return result;
};

const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string) => {
  const result = await prisma.admin.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
