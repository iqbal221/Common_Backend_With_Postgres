import { FeesManagement, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { FeesManagementSearchableFields } from './feesManagement.constant';
import { IFeesManagementFilters } from './feesManagement.interface';

const InsertIntoDB = async (data: any): Promise<FeesManagement> => {
  const dateString = data.entryDate;

  const dateObject = new Date(dateString);

  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.entryDate = isoString;

  const result = await prisma.feesManagement.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IFeesManagementFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<FeesManagement[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FeesManagementSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.FeesManagementWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.feesManagement.findMany({
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.feesManagement.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<FeesManagement | null> => {
  const result = await prisma.feesManagement.findUnique({
    where: {
      id,
    },
  });
  return result;
};
// const GetStudentDetails = async (
//   name: string,
//   admission: string,
//   roll: string
// ): Promise<Student | null> => {
//   const result = await prisma.student.findUnique({
//     where: {
//       name,
//       admission,
//       roll,
//     },
//   });
//   return result;
// };

const UpdateIntoDB = async (
  id: string,
  payload: Partial<FeesManagement>
): Promise<FeesManagement> => {
  const result = await prisma.feesManagement.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.feesManagement.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FeesManagementService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  // GetStudentDetails,
  UpdateIntoDB,
  DeleteFromDB,
};
