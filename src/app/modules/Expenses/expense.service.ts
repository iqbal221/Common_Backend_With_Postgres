import { Expense, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { ExpenseSearchableFields } from './expense.constant';
import { IExpenseFilters } from './expense.interface';

const InsertIntoDB = async (data: any): Promise<Expense> => {
  const dateString = data.entryDate;

  const dateObject = new Date(dateString);

  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.entryDate = isoString;

  const result = await prisma.expense.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IExpenseFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Expense[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ExpenseSearchableFields.map(field => ({
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

  const whereCondition: Prisma.ExpenseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.expense.findMany({
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
  const total = await prisma.expense.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<Expense | null> => {
  const result = await prisma.expense.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<Expense>
): Promise<Expense> => {
  const result = await prisma.expense.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.expense.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ExpenseService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
