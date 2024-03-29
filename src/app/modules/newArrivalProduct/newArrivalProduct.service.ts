import { NewArrivalProduct, Prisma } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { NewArrivalProductSearchableFields } from './newArrivalProduct.constant';
import { INewArrivalProductFilters } from './newArrivalProduct.interface';

type MulterRequest = {
  files: any; // Adjust the type of 'files' according to your implementation
} & Request;

const InsertIntoDB = async (req: MulterRequest): Promise<NewArrivalProduct> => {
  const files = req.files;

  const imageUrlList: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i].path;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    imageUrlList.push(uploadedImage?.secure_url || '');
  }

  const data: any = req.body;
  data.image = imageUrlList;

  const result = await prisma.newArrivalProduct.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: INewArrivalProductFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<NewArrivalProduct[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: NewArrivalProductSearchableFields.map(field => ({
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

  const whereCondition: Prisma.NewArrivalProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.newArrivalProduct.findMany({
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
  const total = await prisma.newArrivalProduct.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<NewArrivalProduct | null> => {
  const result = await prisma.newArrivalProduct.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<NewArrivalProduct>
): Promise<NewArrivalProduct> => {
  const result = await prisma.newArrivalProduct.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.newArrivalProduct.delete({
    where: {
      id,
    },
  });
  return result;
};

export const NewArrivalProductService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
