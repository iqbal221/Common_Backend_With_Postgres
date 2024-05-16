import { z } from 'zod';

const create = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  admission: z.string({
    required_error: 'Admission is required',
  }),
  roll: z.string({
    required_error: 'Roll No is required',
  }),
  fatherName: z.string({
    required_error: 'Father Name is required',
  }),
  motherName: z.string({
    required_error: 'Mother Name is required',
  }),
  contact: z.string({
    required_error: 'Contact No is required',
  }),
  emergencyContactNo: z.string({
    required_error: 'Contact No is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  gender: z.string({
    required_error: 'Gender is required',
  }),
  religious: z.string({
    required_error: 'Religious is required',
  }),
  dateOfBirth: z.string({
    required_error: 'Date Of Birth is required',
  }),
  bloodGroup: z.string({
    required_error: 'Blood Group is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  village: z.string({
    required_error: 'Village is required',
  }),
  po: z.string({
    required_error: 'Post Code is required',
  }),
  ps: z.string({
    required_error: 'Address is required',
  }),
  dist: z.string({
    required_error: 'Dist is required',
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const StudentValidation = {
  create,
  update,
};
