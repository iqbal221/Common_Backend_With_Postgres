import { z } from 'zod';

const createAdmin = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required' }),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// const updateUser = z.object({
//   body: z.object({
//     password: z.string().optional(),
//     firstName: z.string().optional(),
//     lastName: z.string().optional(),
//     dateOfBirth: z.string().optional(),
//     gender: z.string().optional(),
//     email: z.string().email().optional(),
//     contactNo: z.string().optional(),
//     emergencyContactNo: z.string().optional(),
//     presentAddress: z.string().optional(),
//     permanentAddress: z.string().optional(),
//   }),
// });

export const UserValidation = {
  createAdmin,
  // updateUser,
};
