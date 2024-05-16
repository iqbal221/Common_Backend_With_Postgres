import { Prisma, Student } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { StudentSearchableFields } from './student.constant';
import { IStudentFilters } from './student.interface';

type MulterRequest = {
  files: any; // Adjust the type of 'files' according to your implementation
} & Request;

const InsertIntoDB = async (req: MulterRequest): Promise<Student> => {
  const files = req.files;

  const imageUrlList: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i].path;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    imageUrlList.push(uploadedImage?.secure_url || '');
  }

  const data: any = req.body;
  console.log('hello', data);
  data.image = imageUrlList;

  const dateString = data.dateOfBirth;
  const dateObject = new Date(dateString);
  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.dateOfBirth = isoString;

  const result = await prisma.student.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IStudentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: StudentSearchableFields.map(field => ({
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

  const whereCondition: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
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
  const total = await prisma.student.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });
  return result;
};

export const StudentService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
